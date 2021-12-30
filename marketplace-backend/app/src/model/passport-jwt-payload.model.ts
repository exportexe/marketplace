export type PassportJWTPayload = {
    aud: string; //audience (UI)
    iss: string; //issuer (BackEnd)
    exp: number; //expiration date in ms (where should be revoked)
    iat: number; //issued at in ms (where was create)
    jti: string; //token id
    sub: string; //user id
}

export type RefreshTokenPayload = Pick<PassportJWTPayload, 'jti' | 'sub'>;
