import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {hash} from 'bcrypt';
import {Model} from 'mongoose';
import {v4 as uuidv4} from 'uuid';

import {RegisterRequestDto} from '../../dto';
import {UserRole} from '../../enums';
import {Customer, CustomerDocument} from '../../schemas';
import {AbstractRolesService} from '../../services';
import {AbstractCustomersRepository} from '../abstract-customers.repository';

@Injectable()
export class CustomersRepository extends AbstractCustomersRepository {

    constructor(@InjectModel(Customer.name) private _customerModel: Model<CustomerDocument>,
                private _rolesService: AbstractRolesService) {
        super();
    }

    async createNewCustomer(registerRequest: RegisterRequestDto): Promise<Customer> {
        const hashSalt: number = 10;

        registerRequest.id = uuidv4();
        registerRequest.password = await hash(registerRequest.password, hashSalt);
        registerRequest.role = await this._rolesService.getRoleByType(UserRole.Default);

        if (!registerRequest.age) {
            registerRequest.age = 18;
        }

        return new this._customerModel(registerRequest).save();
    }

    async findCustomerByUserName(userName: string): Promise<Customer | null> {
        return this._customerModel.findOne({userName});
    }

    async findCustomerByEMail(email: string): Promise<Customer | null> {
        return this._customerModel.findOne({email});
    }

    async findCustomerById(customerId: string): Promise<Customer | null> {
        return this._customerModel
            .findOne({id: customerId})
            .populate('role', 'type')
            .exec();
    }

    async findAllCustomers(): Promise<Customer[] | null> {
        return this._customerModel
            .find()
            .populate('role', 'type')
            .exec();
    }
}
