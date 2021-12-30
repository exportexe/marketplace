import {RefreshToken} from '../schemas/refresh-token.schema';

export abstract class AbstractRefreshTokenRepository {

    abstract createRefreshToken(customerId: string, ttl: number): Promise<RefreshToken>;

    abstract findTokenById(id: string): Promise<RefreshToken | null>;
}
