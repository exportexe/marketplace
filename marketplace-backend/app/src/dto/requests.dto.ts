import {IsNotEmpty, IsOptional, MinLength} from 'class-validator';
import {Role} from '../schemas';

const USERNAME_IS_REQUIRED: string = 'USERNAME IS REQUIRED';
const PASSWORD_IS_REQUIRED: string = 'PASSWORD IS REQUIRED';
const PASSWORD_MIN_LENGTH: number = 8;

export class LoginRequestDto {

    @IsNotEmpty({message: USERNAME_IS_REQUIRED})
    readonly userName: string;

    @IsNotEmpty({message: PASSWORD_IS_REQUIRED})
    readonly password: string;
}

export class RegisterRequestDto {

    id: string;

    readonly firstName: string;

    @IsNotEmpty({message: USERNAME_IS_REQUIRED})
    readonly userName: string;

    @IsNotEmpty({message: PASSWORD_IS_REQUIRED})
    @MinLength(PASSWORD_MIN_LENGTH, {message: 'YOUR PASSWORD MUST BE AT LEAST 8 CHARACTERS'})
    password: string;

    @IsNotEmpty({message: 'EMAIL IS REQUIRED'})
    email: string;

    @IsOptional()
    age: number;

    @IsNotEmpty({message: 'Role is required'})
    role: Role;
}
