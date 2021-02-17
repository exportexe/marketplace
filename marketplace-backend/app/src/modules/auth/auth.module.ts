import {CacheModule, MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {JwtModule} from '@nestjs/jwt';

import {RefreshTokenRepository} from './repository/refresh-token.repository';
import {TokensService} from './service/tokens.service';
import {RefreshToken, RefreshTokenSchema} from './schema/refresh-token.schema';
import {AuthController} from './controller/auth.controller';
import {CustomersModule} from '../customers/customers.module';
import {JwtStrategy} from './strategy/jwt.strategy';
import {LoggerMiddleware} from './middlewares/logger.middleware';

const TTL: number = 60 * 60 * 24 * 30;
const MAX_CACHE_VOLUME: number = Number(process.env.MAX_CACHE_VOLUME);

@Module({
    imports: [
        CacheModule.register({
            ttl: TTL,
            max: MAX_CACHE_VOLUME,
        }),
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
export class AuthModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(
                {
                    path: 'api/auth/account',
                    method: RequestMethod.POST,
                },
            );
    }
}
