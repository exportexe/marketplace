import {RegisterRequestDto} from '../dto';
import {ICustomer} from '../schemas';

export abstract class AbstractCustomersService {

    abstract validateCredentials(providedPassword: string, customerPassword: string): Promise<boolean>;

    abstract getAllCustomers(): Promise<ICustomer[] | null>;

    abstract createCustomerFromRequest(request: RegisterRequestDto): Promise<ICustomer | null>;

    abstract findCustomerById(id: string): Promise<ICustomer | null>;

    abstract findCustomerByUserName(userName: string): Promise<ICustomer | null>;

    abstract findCustomerByEmail(email: string): Promise<ICustomer | null>;
}
