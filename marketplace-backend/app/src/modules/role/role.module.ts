import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Role, RoleSchema} from '../../schemas';
import {AbstractRolesService} from '../../services';
import {RolesService} from '../../services';
import {RoleController} from './controllers/role.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Role.name,
                schema: RoleSchema,
            },
        ]),
    ],
    providers: [
        {
            provide: AbstractRolesService,
            useClass: RolesService,
        },
    ],
    controllers: [
        RoleController,
    ],
})
export class RoleModule {
}