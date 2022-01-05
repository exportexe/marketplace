import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Customer, CustomerSchema, Role, RoleSchema} from '../../schemas';
import {CustomersController} from './controllers/customers.controller';
import {AbstractCustomersService, AbstractRolesService, CustomersService, RolesService} from '../../services';
import {AbstractCustomersRepository, CustomersRepository} from '../../repositories';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Customer.name,
                schema: CustomerSchema,
            },
            {
                name: Role.name,
                schema: RoleSchema,
            },
        ]),
    ],
    providers: [
        {
            provide: AbstractCustomersRepository,
            useClass: CustomersRepository,
        },
        {
            provide: AbstractCustomersService,
            useClass: CustomersService,
        },
        {
            provide: AbstractRolesService,
            useClass: RolesService,
        },
    ],
    controllers: [
        CustomersController,
    ],
})
export class CustomersModule {
}
