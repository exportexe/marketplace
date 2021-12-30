import {ExecutionContext, Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Observable} from 'rxjs';
import {Request} from 'express';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const {REFRESH_TOKEN, BEARER} = process.env;
        const req: Request = context.switchToHttp().getRequest<Request>();
        const bearerTokenFromRequest: string = req.headers.authorization;
        const tokenFromCookies: string = req.cookies[REFRESH_TOKEN];

        if (!bearerTokenFromRequest && tokenFromCookies) {
            req.headers.authorization = `${BEARER} ${tokenFromCookies}`;
        }

        return super.canActivate(context);
    }
}
