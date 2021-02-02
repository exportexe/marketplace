import {UserInfo} from '../../modules/user-info/schema/user-info.schema';
import {UserInfoDto} from '../../modules/user-info/dto/user-info.dto';

export const mapToUserInfoDto = (data: UserInfo): UserInfoDto => {
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        age: data.age,
        sex: data.sex,
    };
};

export const mapToUserInfoDtoList = (data: UserInfo[]): UserInfoDto[] => {
    return data.map((userInfo: UserInfo): UserInfoDto => {
        return {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            userName: userInfo.userName,
            age: userInfo.age,
            sex: userInfo.sex,
        };
    });
};