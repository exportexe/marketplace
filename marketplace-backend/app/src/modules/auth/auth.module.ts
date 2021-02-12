import {CacheModule, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {JwtModule} from '@nestjs/jwt';

import {RefreshTokenRepository} from './repository/refresh-token.repository';
import {TokensService} from './service/tokens.service';
import {RefreshToken, RefreshTokenSchema} from './schema/refresh-token.schema';
import {AuthController} from './controller/auth.controller';
import {CustomersModule} from '../customers/customers.module';
import {JwtStrategy} from './strategy/jwt.strategy';

@Module({
    imports: [
        CacheModule.register(),
        MongooseModule.forFeature([
            {
                name: RefreshToken.name,
                schema: RefreshTokenSchema,
            },
        ]),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: {
                expiresIn: process.env.TOKEN_EXPIRES_IN,
            },
        }),
        CustomersModule,
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        RefreshTokenRepository,
        TokensService,
        JwtStrategy,
    ],
})
export class AuthModule {
}
