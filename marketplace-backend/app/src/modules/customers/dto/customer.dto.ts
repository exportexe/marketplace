import {Base} from '../../../shared/models/base.model';

export interface CustomerDto extends Base {
    userName: string;
    firstName: string;
    age: number;
    email: string;
}
