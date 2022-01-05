import {Injectable, UnauthorizedException, UnprocessableEntityException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {TokenExpiredError} from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';

import {AbstractTokensService} from '../abstract-tokens.service';
import {PassportJWTPayload, RefreshTokenPayload} from '../../types';

@Injectable()
export class TokensService extends AbstractTokensService {

    constructor(private _jwtService: JwtService) {
        super();
    }

    public async generateToken(customerId: string, expiresIn: number): Promise<string> {
        const {SERVER, PORT, FRONTEND_SERVER, FRONTEND_PORT} = process.env;

        return this._jwtService.signAsync({}, {
            jwtid: uuidv4(),
            subject: customerId,
            expiresIn: Date.now() + expiresIn,
            issuer: `${SERVER}${PORT}`,
            audience: `${FRONTEND_SERVER}${FRONTEND_PORT}`,
        });
    }

    public async decodeAndVerifyTokenAsync(encodedToken: string): Promise<RefreshTokenPayload> {
        const tokenPayload: RefreshTokenPayload = await this._decodeAndVerifyToken(encodedToken);

        if (!tokenPayload) {
            throw new UnauthorizedException('Token is not found');
        }

        return tokenPayload;
    }

    public decodeToken(encodedToken: string): PassportJWTPayload {
        return this._jwtService.decode(encodedToken) as PassportJWTPayload;
    }

    private async _decodeAndVerifyToken(encodedToken: string): Promise<RefreshTokenPayload> {
        try {
            return await this._jwtService.verifyAsync(encodedToken);
        } catch (e) {
            throw new UnauthorizedException(e instanceof TokenExpiredError ? 'Token expired' : 'Token malformed');
        }
    }
}
