import {AuthPayload} from '../models/auth-payload.model';
import {Customer} from '../../../schemas/customer.schema';

export function createAuthPayloadResponse(customer: Customer, refreshToken: string): AuthPayload {
    return {
        customer,
        payload: {
            type: process.env.BEARER,
            refresh_token: refreshToken,
        },
    };
}
