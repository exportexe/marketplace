import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CustomersModule} from './modules/customers/customers.module';
import {AuthModule} from './modules/auth/auth.module';

const mongoDB = process.env.mongoURI;

@Module({
    imports: [
        AuthModule,
        CustomersModule,
        MongooseModule.forRoot(mongoDB),
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
