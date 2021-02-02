import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {UserInfoController} from './user-info.controller';
import {UserInfoService} from '../../shared/services/user-info.service';
import {UserInfo, UserInfoSchema} from './schema/user-info.schema';

@Module({
    controllers: [
        UserInfoController,
    ],
    imports: [
        MongooseModule.forFeature([
            {
                name: UserInfo.name,
                schema: UserInfoSchema,
            },
        ]),
    ],
    providers: [
        UserInfoService,
    ],
})
export class UserInfoModule {
}