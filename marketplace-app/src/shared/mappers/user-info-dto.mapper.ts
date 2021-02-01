import {UserInfoEntity} from '../../modules/user-info/entity/user-info-entity.model';
import {UserInfoDto} from '../../modules/user-info/dto/user-info-dto.model';

export const mapToUserInfoDto = (data: UserInfoEntity): UserInfoDto => {
    return {
        id: data.id,
        name: data.name,
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        age: data.age,
        sex: data.sex,
    };
};