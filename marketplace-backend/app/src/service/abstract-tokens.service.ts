import {RefreshToken} from '../schema/refresh-token.schema';
import {Customer} from '../schema/customer.schema';

export abstract class AbstractTokensService {

    abstract generateAccessToken(customerId: string): Promise<string>;

    abstract generateRefreshToken(customerId: string, expiresIn: number): Promise<string>;

    abstract resolveRefreshToken(encoded: string): Promise<{ customer: Customer, token: RefreshToken }>;

    abstract createAccessTokenFromRefreshToken(refreshToken: string): Promise<{ token: string, customer: Customer }>;
}
