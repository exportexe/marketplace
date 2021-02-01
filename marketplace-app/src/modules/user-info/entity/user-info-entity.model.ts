import {Base} from '../../../shared/models/base.model';

export interface UserInfoEntity extends Base {
    firstName: string;
    lastName: string;
    userName: string;
    age: number;
    sex: string;
}