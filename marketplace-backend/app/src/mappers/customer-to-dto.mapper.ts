import {CustomerDto} from '../dto';
import {ICustomer} from '../schemas';

export function customerToDtoMapper(customer: ICustomer): CustomerDto {
    const {userName, firstName, email, age, role} = customer;

    return {
        userName,
        firstName,
        email,
        age,
        role,
    };
}
