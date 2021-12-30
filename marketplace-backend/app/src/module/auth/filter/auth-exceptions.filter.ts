import {ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, HttpException, HttpStatus} from '@nestjs/common';
import {Response} from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost): void {
        const response: Response = host.switchToHttp().getResponse<Response>();

        if (exception instanceof ForbiddenException) {
            response.redirect(process.env.DEFAULT_PAGE_URL);
        }

        response.sendStatus(HttpStatus.OK);
    }
}
