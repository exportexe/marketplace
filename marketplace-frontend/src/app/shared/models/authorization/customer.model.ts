import {Base} from '../base.model';

export interface Customer extends Base {
    firstName: string;
    userName: string;
    email: string;
    age?: number;
    password?: string;
}
