import {ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, HttpException, UnauthorizedException} from '@nestjs/common';
import {Response} from 'express';
import {HttpArgumentsHost} from '@nestjs/common/interfaces';

import {IRequestFlash} from '../models/request-flash.model';

const LOGIN_ERROR = 'loginError';
const LOGIN_ERROR_MESSAGE = 'Please try again!';
const ERROR_PAGE_URL = process.env.ERROR_PAGE_URL;
const PATH = '/';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<IRequestFlash>();

        if (exception instanceof UnauthorizedException || exception instanceof ForbiddenException) {
            request.flash(LOGIN_ERROR, LOGIN_ERROR_MESSAGE);
            response.redirect(PATH);
        } else {
            response.redirect(ERROR_PAGE_URL);
        }
    }
}
