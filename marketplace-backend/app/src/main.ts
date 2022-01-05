import {NestFactory} from '@nestjs/core';
import {Logger} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import {AppModule} from './app.module';
import {addAuthHeader} from './middlewares';
import {HttpExceptionFilter} from './filters';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    const port: string = process.env.PORT;
    const swaggerConfig = new DocumentBuilder()
        .setTitle('allShare marketplace application')
        .setDescription('REST API docs')
        .setVersion('1.0.0')
        .addTag('exportexe')
        .build();

    SwaggerModule.setup(process.env.SWAGGER_DOCS_ROUTE, app, SwaggerModule.createDocument(app, swaggerConfig));

    app.enableCors({
        origin: true,
        credentials: true,
        exposedHeaders: 'Set-Cookie',
    });
    app.useGlobalFilters(new HttpExceptionFilter());
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(addAuthHeader);

    await app.listen(port);

    Logger.log(`Server started, running on ${process.env.SERVER + port}`, 'Bootstrap');
}

bootstrap();
