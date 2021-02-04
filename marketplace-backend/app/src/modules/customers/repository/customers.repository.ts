import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {hash} from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

import {Customer, CustomerDocument} from '../schema/customer.schema';
import {RegisterRequest} from '../../../shared/models/requests.model';

const HASH_SALT = 10;

@Injectable()
export class CustomersRepository {

    constructor(@InjectModel(Customer.name) private _customerModel: Model<CustomerDocument>) {
    }

    async createNewCustomer(registerRequest: RegisterRequest): Promise<Customer> {
        registerRequest.id = uuidv4();
        registerRequest.password = await hash(registerRequest.password, HASH_SALT);
        registerRequest.email = await hash(registerRequest.email, HASH_SALT);

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
