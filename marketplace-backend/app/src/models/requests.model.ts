import {IsNotEmpty, MinLength} from 'class-validator';

const USERNAME_IS_REQUIRED: string = 'USERNAME IS REQUIRED';
const PASSWORD_IS_REQUIRED: string = 'PASSWORD IS REQUIRED';
const PASSWORD_MIN_LENGTH: number = 8;

export class LoginRequest {

    @IsNotEmpty({message: USERNAME_IS_REQUIRED})
    readonly userName: string;

    @IsNotEmpty({message: PASSWORD_IS_REQUIRED})
    readonly password: string;
}

export class RegisterRequest {

    id: string;

    readonly firstName: string;

    @IsNotEmpty({message: USERNAME_IS_REQUIRED})
    readonly userName: string;

    @IsNotEmpty({message: PASSWORD_IS_REQUIRED})
    @MinLength(PASSWORD_MIN_LENGTH, {message: 'YOUR PASSWORD MUST BE AT LEAST 8 CHARACTERS'})
    password: string;

    @IsNotEmpty({message: 'EMAIL IS REQUIRED'})
    email: string;

    age?: number;
}

export class RefreshRequest {

    @IsNotEmpty({message: 'REFRESH TOKEN IS REQUIRED'})
    readonly refreshToken: string;
}
