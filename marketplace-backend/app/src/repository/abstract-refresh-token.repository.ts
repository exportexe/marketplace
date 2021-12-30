import {RefreshToken} from '../schema/refresh-token.schema';

export abstract class AbstractRefreshTokenRepository {

    abstract createRefreshToken(customerId: string, ttl: number): Promise<RefreshToken>;

    abstract findTokenById(id: string): Promise<RefreshToken | null>;

    abstract findAndRevokeTokenById(id: string): Promise<RefreshToken>;
}
