import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserInfoModule} from './modules/user-info/user-info.module';

@Module({
    imports: [
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