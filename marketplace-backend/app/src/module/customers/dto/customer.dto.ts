import {Base} from '../../../model';

export interface CustomerDto extends Base {
    userName: string;
    firstName: string;
    age: number;
    email: string;
}
