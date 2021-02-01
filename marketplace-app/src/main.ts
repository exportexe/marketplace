import {NestFactory} from '@nestjs/core';
import {Logger} from '@nestjs/common';

import {AppModule} from './app.module';

const PORT = process.env.PORT;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(PORT);
    Logger.log('Server started, running on http://localhost:' + PORT, 'Bootstrap');
}

bootstrap();