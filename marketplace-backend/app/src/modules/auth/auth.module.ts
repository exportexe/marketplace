import {CacheModule, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {JwtModule} from '@nestjs/jwt';

import {RefreshTokenRepository} from '../../repositories/impl/refresh-token.repository';
import {TokensService} from '../../services/impl/tokens.service';
import {RefreshToken, RefreshTokenSchema} from '../../schemas/refresh-token.schema';
import {AuthController} from './controller/auth.controller';
import {JwtStrategy} from '../../strategies/jwt.strategy';
import {AbstractCustomersService} from '../../services/abstract-customers.service';
import {CustomersService} from '../../services/impl/customers.service';
import {AbstractCustomersRepository} from '../../repositories/abstract-customers.repository';
import {CustomersRepository} from '../../repositories/impl/customers.repository';
import {AbstractTokensService} from '../../services/abstract-tokens.service';
import {AbstractRefreshTokenRepository} from '../../repositories/abstract-refresh-token.repository';
import {Customer, CustomerSchema} from '../../schemas/customer.schema';

const CACHE_TIME_TO_LIVE: number = 60 * 60 * 24 * 30;

@Module({
    imports: [
        CacheModule.register({
            ttl: CACHE_TIME_TO_LIVE,
            max: +process.env.MAX_CACHE_VOLUME,
        }),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: {
                expiresIn: process.env.TOKEN_EXPIRES_IN,
            },
        }),
        MongooseModule.forFeature([
            {
                name: RefreshToken.name,
                schema: RefreshTokenSchema,
            },
            {
                name: Customer.name,
                schema: CustomerSchema,
            },
        ]),
    ],
    providers: [
        JwtStrategy,
        {
            provide: AbstractTokensService,
            useClass: TokensService,
        },
        {
            provide: AbstractCustomersService,
            useClass: CustomersService,
        },
        {
            provide: AbstractCustomersRepository,
            useClass: CustomersRepository,
        },
        {
            provide: AbstractRefreshTokenRepository,
            useClass: RefreshTokenRepository,
        },
    ],
    controllers: [
        AuthController,
    ],
})
export class AuthModule {
}
