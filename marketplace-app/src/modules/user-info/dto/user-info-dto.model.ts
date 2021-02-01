import {Base} from '../../../shared/models/base.model';

export interface UserInfoDto extends Base {
    firstName: string;
    lastName: string;
    userName: string;
    age: number;
    sex: string;
}