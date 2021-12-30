import {Customer} from '../../../schemas/customer.schema';

export interface AuthPayload {
    customer: Customer;
    payload: TokenPayload;
}

export type TokenPayload = {
    type: string;
    refresh_token: string;
};
