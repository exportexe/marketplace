import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserInfoModule} from './modules/user-info/user-info.module';

const mongoDB = process.env.mongoURI;

@Module({
    imports: [
        MongooseModule.forRoot(mongoDB),
        UserInfoModule,
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