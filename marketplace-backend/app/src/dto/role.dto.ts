import {IsNotEmpty, MaxLength} from 'class-validator';

const DESC_MAX_LENGTH: number = 60;

export class RoleDto {

    id: string;

    @IsNotEmpty({message: 'Type is required'})
    readonly type: string;

    @MaxLength(DESC_MAX_LENGTH, {message: 'Message should be no more than 60 symbols'})
    readonly description: string;
}