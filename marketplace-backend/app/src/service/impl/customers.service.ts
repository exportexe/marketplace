import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {compare} from 'bcrypt';

import {RegisterRequest} from '../../model/requests.model';
import {Customer} from '../../schema/customer.schema';
import {AbstractCustomersService} from '../abstract-customers.service';
import {AbstractCustomersRepository} from '../../repository/abstract-customers.repository';

@Injectable()
export class CustomersService extends AbstractCustomersService {

    constructor(private _customersRepository: AbstractCustomersRepository) {
        super();
    }

    async validateCredentials(providedPassword: string, customerPassword: string): Promise<boolean> {
        return compare(providedPassword, customerPassword);
    }

    async createCustomerFromRequest(request: RegisterRequest): Promise<Customer> {
        const existingCustomerUserName: Customer = await this.findCustomerByUserName(request.userName);

        if (existingCustomerUserName) {
            throw new UnprocessableEntityException('USERNAME ALREADY IN USE');
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
