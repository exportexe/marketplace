import {CacheModule, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {JwtModule} from '@nestjs/jwt';

import {AbstractCustomersRepository, CustomersRepository} from '../../repositories';
import {AbstractCustomersService, AbstractRolesService, AbstractTokensService, CustomersService, RolesService, TokensService} from '../../services';
import {Customer, CustomerSchema, Role, RoleSchema} from '../../schemas';
import {AuthController} from './controllers/auth.controller';
import {JwtStrategy} from '../../strategies';

const CACHE_TIME_TO_LIVE_MS: number = 60 * 60 * 24 * 30;

@Module({
    imports: [
        CacheModule.register({
            ttl: CACHE_TIME_TO_LIVE_MS,
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
                name: Customer.name,
                schema: CustomerSchema,
            },
            {
                name: Role.name,
                schema: RoleSchema,
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
            provide: AbstractRolesService,
            useClass: RolesService,
        },
    ],
    controllers: [
        AuthController,
    ],
})
export class AuthModule {
}
