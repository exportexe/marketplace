import {CACHE_MANAGER, Inject, Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import {Cache} from 'cache-manager';

import {TokensService} from '../service/tokens.service';

const BEARER = process.env.BEARER + ' ';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const CUSTOMER_INFO = process.env.CUSTOMER_INFO;

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    constructor(@Inject(CACHE_MANAGER) private readonly _cacheManager: Cache,
                private readonly _tokensService: TokensService) {
    }

    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        const accessToken: string = await this._cacheManager.get(ACCESS_TOKEN);
        const refreshToken: string = req.cookies[REFRESH_TOKEN];

        if (accessToken) {
            req.headers.authorization = BEARER + accessToken;
        } else if (refreshToken) {
            await this._getAccessTokenAndCustomer(refreshToken, req);
        }

        next();
    }

    private async _getAccessTokenAndCustomer(refreshToken: string, req: Request): Promise<void> {
        const {customer, token} = await this._tokensService.createAccessTokenFromRefreshToken(refreshToken);
        await this._cacheManager.set(CUSTOMER_INFO, customer);
        await this._cacheManager.set(ACCESS_TOKEN, token);
        req.headers.authorization = BEARER + token;
    }
}
