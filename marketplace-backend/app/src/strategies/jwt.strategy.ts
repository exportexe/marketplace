import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';

import {PassportJWTPayload} from '../modules/auth/models/passport-jwt-payload.model';
import {Customer} from '../schemas/customer.schema';
import {AbstractCustomersService} from '../services/abstract-customers.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(private _customersService: AbstractCustomersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY,
            signOptions: {
                expiresIn: process.env.TOKEN_EXPIRES_IN,
            },
        });
    }

    async validate(payload: PassportJWTPayload): Promise<Customer> {
        /*
        TODO: need to add logic for refresh session and checking (and set revoked = true) if token is revoked
             Also need check if could we pass customer to the response
         */

        return await this._customersService.findCustomerById(payload.sub);
    }
}
