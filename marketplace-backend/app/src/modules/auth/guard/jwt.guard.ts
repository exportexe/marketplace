import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

const JWT = 'jwt';

@Injectable()
export class JwtGuard extends AuthGuard(JWT) {

    handleRequest(err, user, info: Error) {
        if (err || info || !user) {
            throw err || info || new UnauthorizedException();
        }

        return user;
    }
}
