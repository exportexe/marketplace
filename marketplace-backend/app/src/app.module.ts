import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {APP_FILTER} from '@nestjs/core';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule, CustomersModule, RoleModule} from './modules';
import {HttpExceptionFilter} from './filters';

const APP_MODULES = [
    AuthModule,
    CustomersModule,
    RoleModule,
];

@Module({
    imports: [
        MongooseModule.forRoot(process.env.mongoURI),
        ...APP_MODULES,
    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {
}
