import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {compare} from 'bcrypt';

import {RegisterRequestDto} from '../../dto';
import {Customer} from '../../schemas';
import {AbstractCustomersService} from '../abstract-customers.service';
import {AbstractCustomersRepository} from '../../repositories';

@Injectable()
export class CustomersService extends AbstractCustomersService {

    constructor(private _customersRepository: AbstractCustomersRepository) {
        super();
    }

    async validateCredentials(providedPassword: string, customerPassword: string): Promise<boolean> {
        return compare(providedPassword, customerPassword);
    }

    async createCustomerFromRequest(request: RegisterRequestDto): Promise<Customer | null> {
        const existingCustomerUserName: Customer = await this.findCustomerByUserName(request.userName);
        const existingCustomerEmail: Customer = await this.findCustomerByEmail(request.email);

        if (existingCustomerUserName) {
            throw new UnprocessableEntityException('Username is already in use');
        }

        if (existingCustomerEmail) {
            throw new UnprocessableEntityException('Email is already in use');
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
