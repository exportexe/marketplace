import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {SignOptions, TokenExpiredError} from 'jsonwebtoken';

import {RefreshTokenRepository} from '../repository/refresh-token.repository';
import {CustomersRepository} from '../../customers/repository/customers.repository';
import {Customer} from '../../customers/schema/customer.schema';
import {RefreshToken} from '../schema/refresh-token.schema';
import {RefreshTokenPayload} from '../models/refresh-token-payload.model';

const BASE_OPTIONS: SignOptions = {
    issuer: process.env.SERVER + process.env.PORT,
    audience: process.env.FRONTEND_SERVER + process.env.FRONTEND_PORT,
};

const REFRESH_TOKEN_EXPIRED = 'REFRESH TOKEN EXPIRED';
const REFRESH_TOKEN_MALFORMED = 'REFRESH TOKEN MALFORMED';
const REFRESH_TOKEN_NOT_FOUND = 'REFRESH TOKEN NOT FOUND';
const REFRESH_TOKEN_REVOKED = 'REFRESH TOKEN IS REVOKED';

@Injectable()
export class TokensService {

    constructor(private readonly _tokensRepository: RefreshTokenRepository,
                private readonly _jwtService: JwtService,
                private readonly _customersRepository: CustomersRepository) {
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

        const opts: SignOptions = {
            ...BASE_OPTIONS,
            expiresIn,
            subject: customerId,
            jwtid: token.id,
        };

        return this._jwtService.signAsync({}, opts);
    }

    async resolveRefreshToken(encoded: string): Promise<{ customer: Customer, token: RefreshToken }> {
        const payload: RefreshTokenPayload = await this._decodeRefreshToken(encoded);
        const token: RefreshToken = await this._getStoredTokenFromRefreshTokenPayload(payload);

        if (!token) {
            throw new UnprocessableEntityException(REFRESH_TOKEN_NOT_FOUND);
        } else if (token.isRevoked) {
            throw new UnprocessableEntityException(REFRESH_TOKEN_REVOKED);
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

    async createAccessTokenFromRefreshToken(refresh: string): Promise<{ token: string, customer: Customer }> {
        const {customer} = await this.resolveRefreshToken(refresh);
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
                throw new UnprocessableEntityException(REFRESH_TOKEN_EXPIRED);
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
