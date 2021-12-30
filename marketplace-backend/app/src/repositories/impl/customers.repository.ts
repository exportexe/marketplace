import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {hash} from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

import {Customer, CustomerDocument} from '../../schemas/customer.schema';
import {RegisterRequest} from '../../models/requests.model';
import {AbstractCustomersRepository} from '../abstract-customers.repository';

@Injectable()
export class CustomersRepository extends AbstractCustomersRepository {

    constructor(@InjectModel(Customer.name) private _customerModel: Model<CustomerDocument>) {
        super();
    }

    async createNewCustomer(registerRequest: RegisterRequest): Promise<Customer> {
        const hashSalt: number = 10;
        registerRequest.id = uuidv4();
        registerRequest.password = await hash(registerRequest.password, hashSalt);

        if (!registerRequest.age) {
            registerRequest.age = 18;
        }

        return new this._customerModel(registerRequest).save();
    }

    async findCustomerById(customerId: string): Promise<Customer | null> {
        return this._customerModel.findOne({id: customerId});
    }

    async findCustomerByUserName(userName: string): Promise<Customer | null> {
        return this._customerModel.findOne({userName});
    }

    async findCustomerByEMail(email: string): Promise<Customer | null> {
        return this._customerModel.findOne({email});
    }

    async findAllCustomers(): Promise<Customer[] | null> {
        return this._customerModel.find().exec();
    }
}
