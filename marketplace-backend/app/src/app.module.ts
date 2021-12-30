import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule, CustomersModule} from './module';

const APP_MODULES = [
    AuthModule,
    CustomersModule,
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
    ],
})
export class AppModule {
}
