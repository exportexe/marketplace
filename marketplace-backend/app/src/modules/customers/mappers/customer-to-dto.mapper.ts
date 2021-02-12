import {CustomerDto} from '../dto/customer.dto';
import {Customer} from '../schema/customer.schema';

export function customerToDtoMapper(customer: Customer): CustomerDto {
    return {
        id: customer.id,
        userName: customer.userName,
        firstName: customer.firstName,
        email: customer.email,
        age: customer.age,
    } as CustomerDto;
}
