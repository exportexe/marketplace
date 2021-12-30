import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Customer, CustomerSchema} from '../../schema';
import {CustomersController} from './controller/customers.controller';
import {AbstractCustomersService, CustomersService} from '../../service';
import {AbstractCustomersRepository, CustomersRepository} from '../../repository';

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
