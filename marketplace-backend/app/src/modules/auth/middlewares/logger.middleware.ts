import {CACHE_MANAGER, Inject, Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import {Cache} from 'cache-manager';

const BEARER = process.env.BEARER + ' ';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    constructor(@Inject(CACHE_MANAGER) private readonly _cacheManager: Cache) {
    }

    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        req.headers.authorization = BEARER + await this._cacheManager.get(ACCESS_TOKEN);
        next();
    }
}
