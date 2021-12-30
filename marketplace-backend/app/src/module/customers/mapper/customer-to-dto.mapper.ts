import {CustomerDto} from '../dto/customer.dto';
import {Customer} from '../../../schema';

export function customerToDtoMapper(customer: Customer = {} as Customer): Omit<CustomerDto, 'name'> {
    const {id, userName, firstName, email, age} = customer;

    return {
        id,
        userName,
        firstName,
        email,
        age,
    };
}
