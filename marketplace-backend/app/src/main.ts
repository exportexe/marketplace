import {NestFactory} from '@nestjs/core';
import {Logger} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import {AppModule} from './app.module';
import {addAuthHeader} from './middleware';
import flash = require('connect-flash');

const PORT = process.env.PORT;

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: true,
        credentials: true,
        exposedHeaders: 'Set-Cookie',
    });
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(flash());
    app.use(addAuthHeader);

    await app.listen(PORT);

    Logger.log('Server started, running on ' + process.env.SERVER + PORT, 'Bootstrap');
}

bootstrap();
