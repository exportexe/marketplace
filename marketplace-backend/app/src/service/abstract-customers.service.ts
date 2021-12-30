import {RegisterRequest} from '../model/requests.model';
import {Customer} from '../schema/customer.schema';

export abstract class AbstractCustomersService {

    abstract validateCredentials(providedPassword: string, customerPassword: string): Promise<boolean>;

    abstract createCustomerFromRequest(request: RegisterRequest): Promise<Customer>;

    abstract findCustomerById(id: string): Promise<Customer | null>;

    abstract findCustomerByUserName(userName: string): Promise<Customer | null>;

    abstract findCustomerByEmail(email: string): Promise<Customer | null>;

    abstract getAllCustomers(): Promise<Customer[] | null>;
}
