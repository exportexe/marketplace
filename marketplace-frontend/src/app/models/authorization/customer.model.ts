import {Base} from '../base.model';

export interface Customer extends Base {
    firstName: string;
    userName: string;
    email: string;
    age?: number;
    password?: string;
}

export type CustomerDto = Omit<Customer, 'id' | 'name' | 'password'>;

export type CustomerAuthPayload = {
    customerInfo: CustomerDto;
    isAuth: boolean;
}

export type CustomerFormData = Customer;
