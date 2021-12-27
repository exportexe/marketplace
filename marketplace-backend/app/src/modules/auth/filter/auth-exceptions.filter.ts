import {
    ArgumentsHost,
    CACHE_MANAGER,
    Catch,
    ExceptionFilter,
    ForbiddenException,
    HttpException,
    HttpStatus,
    Inject,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import {Response} from 'express';
import {HttpArgumentsHost} from '@nestjs/common/interfaces';
import {Cache} from 'cache-manager';

const ERROR_PAGE_URL = process.env.ERROR_PAGE_URL;
const DEFAULT_PAGE_URL = process.env.FRONTEND_SERVER + process.env.FRONTEND_PORT + process.env.DEFAULT_PAGE_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {

    constructor(@Inject(CACHE_MANAGER) private _cacheManager: Cache) {
    }

    async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const response: Response = ctx.getResponse<Response>();

        if (AuthExceptionFilter._checkForExceptionType(exception)) {
            response.redirect(DEFAULT_PAGE_URL);
        } else if (exception instanceof UnauthorizedException) {
            await this._cacheManager.del(ACCESS_TOKEN);
            response.sendStatus(HttpStatus.OK);
        } else if (exception) {
            response.sendStatus(HttpStatus.OK);
        } else {
            response.redirect(ERROR_PAGE_URL);
        }
    }

    private static _checkForExceptionType(exception: HttpException): boolean {
        return exception instanceof ForbiddenException || exception instanceof UnprocessableEntityException;
    }
}
