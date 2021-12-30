import {CacheModule, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {JwtModule} from '@nestjs/jwt';

import {AbstractCustomersRepository, AbstractRefreshTokenRepository, CustomersRepository, RefreshTokenRepository} from '../../repository';
import {AbstractCustomersService, AbstractTokensService, CustomersService, TokensService} from '../../service';
import {Customer, CustomerSchema, RefreshToken, RefreshTokenSchema} from '../../schema';
import {AuthController} from './controller/auth.controller';
import {JwtStrategy} from '../../strategy';

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
