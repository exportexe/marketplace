import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';

import {CustomersService} from '../../customers/service/customers.service';
import {AccessTokenPayload} from '../models/access-token-payload.model';
import {Customer} from '../../customers/schema/customer.schema';

const jwtPayload = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: process.env.SECRET_KEY,
    signOptions: {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
    },
};

const JWT = 'jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT) {

    constructor(private readonly _customersService: CustomersService) {
        super(jwtPayload);
    }

    async validate(payload: AccessTokenPayload): Promise<Customer> {
        const customer: Customer = await this._customersService.findCustomerById(payload.sub);

        if (!customer) {
            return null;
        }

        return customer;
    }
}
