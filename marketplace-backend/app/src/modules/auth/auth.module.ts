import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {JwtModule} from '@nestjs/jwt';

import {AuthService} from './service/auth.service';
import {RefreshTokenRepository} from './repository/refresh-token.repository';
import {TokensService} from './service/tokens.service';
import {RefreshToken, RefreshTokenSchema} from './schema/refresh-token.schema';

@Module({
    imports: [
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
    ],
    providers: [
        AuthService,
        RefreshTokenRepository,
        TokensService,
    ],
})
export class AuthModule {
}
