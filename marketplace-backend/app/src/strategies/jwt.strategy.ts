import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';

import {PassportJWTPayload} from '../types';
import {Customer} from '../schemas';
import {AbstractCustomersService} from '../services';

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
        return await this._customersService.findCustomerById(payload.sub);
    }
}
