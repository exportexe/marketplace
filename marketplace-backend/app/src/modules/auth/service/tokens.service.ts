import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {SignOptions} from 'jsonwebtoken';

import {RefreshTokenRepository} from '../repository/refresh-token.repository';

const BASE_OPTIONS: SignOptions = {
    issuer: process.env.SERVER + process.env.PORT,
    audience: process.env.SERVER + process.env.PORT,
};

@Injectable()
export class TokensService {

    private readonly _tokensRepository: RefreshTokenRepository;
    private readonly _jwtService: JwtService;

    constructor(tokensRepository: RefreshTokenRepository,
                jwt: JwtService) {
        this._tokensRepository = tokensRepository;
        this._jwtService = jwt;
    }

    async generateAccessToken(customerId: string): Promise<string> {
        const opts: SignOptions = {
            ...BASE_OPTIONS,
            subject: String(customerId),
        };

        return this._jwtService.signAsync({}, opts);
    }

    async generateRefreshToken(customerId: string, expiresIn: number): Promise<string> {
        const token = await this._tokensRepository.createRefreshToken(customerId, expiresIn);
        const opts: SignOptions = {
            ...BASE_OPTIONS,
            expiresIn,
            subject: customerId,
            jwtid: token.id,
        };

        return this._jwtService.signAsync({}, opts);
    }
}
