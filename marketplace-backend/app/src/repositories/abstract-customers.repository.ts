import {RegisterRequestDto} from '../dto';
import {Customer} from '../schemas';

export abstract class AbstractCustomersRepository {

    abstract createNewCustomer(registerRequest: RegisterRequestDto): Promise<Customer>;

    abstract findCustomerById(customerId: string): Promise<Customer | null>;

    abstract findCustomerByUserName(userName: string): Promise<Customer | null>;

    abstract findCustomerByEMail(email: string): Promise<Customer | null>;

    abstract findAllCustomers(): Promise<Customer[] | null>;
}
