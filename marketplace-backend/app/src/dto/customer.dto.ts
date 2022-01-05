import {ICustomer} from '../schemas';

export type CustomerDto = Omit<ICustomer, 'id' | 'password'>;
