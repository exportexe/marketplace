import {NestFactory} from '@nestjs/core';
import {Logger} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import flash = require('connect-flash');

import {AppModule} from './app.module';

const SERVER = process.env.SERVER;
const PORT = process.env.PORT;
const SET_COOKIE_HEADER = 'Set-Cookie';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: true,
        credentials: true,
        exposedHeaders: SET_COOKIE_HEADER,
    });
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(flash());

    await app.listen(PORT);

    Logger.log('Server started, running on ' + SERVER + PORT, 'Bootstrap');
}

bootstrap();
