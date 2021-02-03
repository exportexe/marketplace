import {Injectable} from '@nestjs/common';

import {Customer} from '../schema/customer.schema';
import {CreateCustomerDto} from '../dto/create-customer.dto';
import {CustomersRepository} from '../repository/customers.repository';

@Injectable()
export class CustomersService {

    constructor(private _customersRepository: CustomersRepository) {
    }

    /*GET*/
    async getAllCustomers(): Promise<Customer[] | null> {
        return this._customersRepository.findAllCustomers();
    }

    /*GET*/
    async getCustomerById(id: string): Promise<Customer | null> {
        return this._customersRepository.findCustomerById(id);
    }

    /*POST*/
    async createNewCustomer(customerDto: CreateCustomerDto): Promise<Customer> {
        return this._customersRepository.createNewCustomer(customerDto);
    }
}
