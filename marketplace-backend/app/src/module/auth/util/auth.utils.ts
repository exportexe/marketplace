import {AuthPayload} from '../model/auth-payload.model';
import {Customer} from '../../../schema';

export function createAuthPayloadResponse(customer: Customer, refreshToken: string): AuthPayload {
    return {
        customer,
        payload: {
            type: process.env.BEARER,
            refresh_token: refreshToken,
        },
    };
}
