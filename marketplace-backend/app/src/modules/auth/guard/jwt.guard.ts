import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

const JWT = 'jwt';

@Injectable()
export class JwtGuard extends AuthGuard(JWT) {

    handleRequest<Customer>(err: Error, customer: Customer, info: Error): Customer {
        if (err || info || !customer) {
            throw new UnauthorizedException;
        }

        return customer;
    }
}
