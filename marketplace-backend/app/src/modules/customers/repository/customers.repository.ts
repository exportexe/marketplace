import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {hash} from 'bcrypt';

import {Customer, CustomerDocument} from '../schema/customer.schema';
import {CreateCustomerDto} from '../dto/create-customer.dto';

const HASH_SALT = 10;

@Injectable()
export class CustomersRepository {

    constructor(@InjectModel(Customer.name) private _customerModel: Model<CustomerDocument>) {
    }

    async findCustomerById(id: string): Promise<Customer | null> {
        return this._customerModel.findById(id);
    }

    async findAllCustomers(): Promise<Customer[] | null> {
        return this._customerModel.find().exec();
    }

    async createNewCustomer(customerDto: CreateCustomerDto): Promise<Customer> {
        customerDto.password = await hash(customerDto.password, HASH_SALT);
        customerDto.email = await hash(customerDto.email, HASH_SALT);

        return new this._customerModel(customerDto).save();
    }
}
