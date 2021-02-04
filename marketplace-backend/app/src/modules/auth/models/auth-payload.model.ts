import {Customer} from '../../customers/schema/customer.schema';

export type TokenPayload = {
    type: string;
    token: string;
    refresh_token?: string;
};

export type AuthActionsPayload = {
   status: string;
   data: AuthPayload;
};

export interface AuthPayload {
    customer: Customer;
    payload: TokenPayload;
}
