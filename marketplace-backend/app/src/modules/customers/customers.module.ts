import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Customer, CustomerSchema} from '../../schemas/customer.schema';
import {CustomersController} from './controller/customers.controller';
import {AbstractCustomersService} from '../../services/abstract-customers.service';
import {CustomersService} from '../../services/impl/customers.service';
import {AbstractCustomersRepository} from '../../repositories/abstract-customers.repository';
import {CustomersRepository} from '../../repositories/impl/customers.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Customer.name,
                schema: CustomerSchema,
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
    ],
    controllers: [
        CustomersController,
    ],
})
export class CustomersModule {
}
