import {RefreshToken} from '../schemas/refresh-token.schema';
import {Customer} from '../schemas/customer.schema';

export abstract class AbstractTokensService {

    abstract generateAccessToken(customerId: string): Promise<string>;

    abstract generateRefreshToken(customerId: string, expiresIn: number): Promise<string>;

    abstract resolveRefreshToken(encoded: string): Promise<{ customer: Customer, token: RefreshToken }>;

    abstract createAccessTokenFromRefreshToken(refreshToken: string): Promise<{ token: string, customer: Customer }>;
}
