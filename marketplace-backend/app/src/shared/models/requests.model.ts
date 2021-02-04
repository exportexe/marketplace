import {IsNotEmpty, MinLength} from 'class-validator';

const USERNAME_IS_REQUIRED = 'USERNAME IS REQUIRED';
const PASSWORD_IS_REQUIRED = 'PASSWORD IS REQUIRED';
const EMAIL_IS_REQUIRED = 'EMAIL IS REQUIRED';
const REFRESH_TOKEN_IS_REQUIRED = 'REFRESH TOKEN IS REQUIRED';
const PASSWORD_VALIDATION_MESSAGE = 'YOUR PASSWORD MUST BE AT LEAST 8 CHARACTERS';
const PASSWORD_MIN_LENGTH = 8;

export class LoginRequest {

    @IsNotEmpty({message: USERNAME_IS_REQUIRED})
    readonly userName: string;

    @IsNotEmpty({message: PASSWORD_IS_REQUIRED})
    readonly password: string;
}

export class RegisterRequest {

    id: string;

    @IsNotEmpty({message: USERNAME_IS_REQUIRED})
    readonly userName: string;

    @IsNotEmpty({message: PASSWORD_IS_REQUIRED})
    @MinLength(PASSWORD_MIN_LENGTH, {message: PASSWORD_VALIDATION_MESSAGE})
    password: string;

    @IsNotEmpty({message: EMAIL_IS_REQUIRED})
    email: string;

    readonly firstName: string;

    readonly age: number;
}

export class RefreshRequest {

    @IsNotEmpty({message: REFRESH_TOKEN_IS_REQUIRED})
    readonly refreshToken: string;
}
