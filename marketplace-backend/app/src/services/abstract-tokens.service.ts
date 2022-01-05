import {PassportJWTPayload, RefreshTokenPayload} from '../types';

export abstract class AbstractTokensService {

    abstract generateToken(customerId: string, expiresIn: number): Promise<string>;

    abstract decodeToken(encodedToken: string): PassportJWTPayload;

    abstract decodeAndVerifyTokenAsync(encodedToken: string): Promise<RefreshTokenPayload | null>;
}
