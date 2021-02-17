import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {compare} from 'bcrypt';

import {Customer} from '../schema/customer.schema';
import {CustomersRepository} from '../repository/customers.repository';
import {RegisterRequest} from '../../../shared/models/requests.model';

const USER_EXISTS = 'USERNAME OR EMAIL ALREADY IN USE';

@Injectable()
export class CustomersService {

    constructor(private readonly _customersRepository: CustomersRepository) {
    }

    async validateCredentials(customer: Customer, password: string): Promise<boolean> {
        return compare(password, customer.password);
    }

    async createCustomerFromRequest(request: RegisterRequest): Promise<Customer> {
        const existingCustomerUserName: Customer = await this.findCustomerByUserName(request.userName);
        const existingCustomerEMail: Customer = await this.findCustomerByEmail(request.email);

        if (existingCustomerUserName || existingCustomerEMail) {
            throw new UnprocessableEntityException(USER_EXISTS);
        }

        return this._customersRepository.createNewCustomer(request);
    }

    async findCustomerById(id: string): Promise<Customer | null> {
        return this._customersRepository.findCustomerById(id);
    }

    async findCustomerByUserName(userName: string): Promise<Customer | null> {
        return this._customersRepository.findCustomerByUserName(userName);
    }

    async findCustomerByEmail(email: string): Promise<Customer | null> {
        return this._customersRepository.findCustomerByEMail(email);
    }

    async getAllCustomers(): Promise<Customer[] | null> {
        return this._customersRepository.findAllCustomers();
    }
}
