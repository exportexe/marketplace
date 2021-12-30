import {RegisterRequest} from '../models/requests.model';
import {Customer} from '../schemas/customer.schema';

export abstract class AbstractCustomersRepository {

    abstract createNewCustomer(registerRequest: RegisterRequest): Promise<Customer>;

    abstract findCustomerById(customerId: string): Promise<Customer | null>;

    abstract findCustomerByUserName(userName: string): Promise<Customer | null>;

    abstract findCustomerByEMail(email: string): Promise<Customer | null>;

    abstract findAllCustomers(): Promise<Customer[] | null>;
}
