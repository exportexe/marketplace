import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Customer, CustomerSchema} from './schema/customer.schema';
import {CustomersService} from './service/customers.service';
import {CustomersController} from './controller/customers.controller';
import {CustomersRepository} from './repository/customers.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Customer.name,
                schema: CustomerSchema,
            },
        ]),
    ],
    controllers: [
        CustomersController,
    ],
    providers: [
        CustomersService,
        CustomersRepository,
    ],
})
export class CustomersModule {
}
