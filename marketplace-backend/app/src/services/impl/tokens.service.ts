import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {SignOptions, TokenExpiredError} from 'jsonwebtoken';

import {Customer} from '../../schemas/customer.schema';
import {RefreshToken} from '../../schemas/refresh-token.schema';
import {RefreshTokenPayload} from '../../models/refresh-token-payload.model';
import {AbstractCustomersRepository} from '../../repositories/abstract-customers.repository';
import {AbstractTokensService} from '../abstract-tokens.service';
import {AbstractRefreshTokenRepository} from '../../repositories/abstract-refresh-token.repository';

const BASE_OPTIONS: SignOptions = {
    issuer: `${process.env.SERVER}${process.env.PORT}`,
    audience: `${process.env.FRONTEND_SERVER}${process.env.FRONTEND_PORT}`,
};
const REFRESH_TOKEN_MALFORMED: string = 'REFRESH TOKEN MALFORMED';

@Injectable()
export class TokensService extends AbstractTokensService {

    constructor(private _tokensRepository: AbstractRefreshTokenRepository,
                private _customersRepository: AbstractCustomersRepository,
                private _jwtService: JwtService) {
        super();
    }

    async generateAccessToken(customerId: string): Promise<string> {
        const opts: SignOptions = {
            ...BASE_OPTIONS,
            subject: customerId,
        };

        return this._jwtService.signAsync({}, opts);
    }

    async generateRefreshToken(customerId: string, expiresIn: number): Promise<string> {
        const token: RefreshToken = await this._tokensRepository.createRefreshToken(customerId, expiresIn);
        const {SERVER, PORT, FRONTEND_SERVER, FRONTEND_PORT} = process.env;

        return this._jwtService.signAsync({}, {
            expiresIn,
            issuer: `${SERVER}${PORT}`,
            audience: `${FRONTEND_SERVER}${FRONTEND_PORT}`,
            subject: customerId,
            jwtid: token.id,
        });
    }

    async resolveRefreshToken(encoded: string): Promise<{ customer: Customer, token: RefreshToken }> {
        const payload: RefreshTokenPayload = await this._decodeRefreshToken(encoded);
        const token: RefreshToken = await this._getStoredTokenFromRefreshTokenPayload(payload);

        if (!token) {
            throw new UnprocessableEntityException('REFRESH TOKEN NOT FOUND');
        } else if (token.isRevoked) {
            throw new UnprocessableEntityException('REFRESH TOKEN IS REVOKED');
        }

        const customer: Customer = await this._getCustomerFromRefreshTokenPayload(payload);

        if (!customer) {
            throw new UnprocessableEntityException(REFRESH_TOKEN_MALFORMED);
        }

        return {
            customer,
            token,
        };
    }

    async createAccessTokenFromRefreshToken(refreshToken: string): Promise<{ token: string, customer: Customer }> {
        const {customer} = await this.resolveRefreshToken(refreshToken);
        const token: string = await this.generateAccessToken(customer.id);

        return {
            customer,
            token,
        };
    }

    private async _decodeRefreshToken(token: string): Promise<RefreshTokenPayload> {
        try {
            return await this._jwtService.verifyAsync(token);
        } catch (e) {
            if (e instanceof TokenExpiredError) {
                throw new UnprocessableEntityException('REFRESH TOKEN EXPIRED');
            } else {
                throw new UnprocessableEntityException(REFRESH_TOKEN_MALFORMED);
            }
        }
    }

    private async _getCustomerFromRefreshTokenPayload(payload: RefreshTokenPayload): Promise<Customer> {
        const subId: string = payload.sub;

        if (!subId) {
            throw new UnprocessableEntityException(REFRESH_TOKEN_MALFORMED);
        }

        return this._customersRepository.findCustomerById(subId);
    }

    private async _getStoredTokenFromRefreshTokenPayload(payload: RefreshTokenPayload): Promise<RefreshToken | null> {
        const tokenId: string = payload.jti;

        if (!tokenId) {
            throw new UnprocessableEntityException(REFRESH_TOKEN_MALFORMED);
        }

        return this._tokensRepository.findTokenById(tokenId);
    }
}
