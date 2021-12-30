import {Customer} from '../../../schema';

export interface AuthPayload {
    customer: Customer;
    payload: TokenPayload;
}

export type TokenPayload = {
    type: string;
    refresh_token: string;
};
