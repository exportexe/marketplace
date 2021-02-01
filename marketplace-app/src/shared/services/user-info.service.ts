import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {v4 as uuid} from 'uuid';

import {UserInfoEntity} from '../../modules/user-info/entity/user-info-entity.model';
import {toPromise} from '../utils/promise.utils';
import {usersInfoMock} from '../mocks/users-info.mock';
import {UserInfoDto} from '../../modules/user-info/dto/user-info-dto.model';
import {mapToUserInfoDto} from '../mappers/user-info-dto.mapper';
import {UserInfoCreateDto} from '../../modules/user-info/dto/user-info-create-dto.model';

@Injectable()
export class UserInfoService {

    private _users: UserInfoEntity[] = usersInfoMock;

    async getOneUserInfo(id: string): Promise<UserInfoDto> {
        const userInfo: UserInfoEntity = this._users.find((userInfo: UserInfoEntity) => userInfo.id === id);
        if (!userInfo) {
            throw new HttpException(`User info with provided id doesn't exist`, HttpStatus.BAD_REQUEST);
        }

        return toPromise(mapToUserInfoDto(userInfo));
    }

    async getAllUserInfos(): Promise<UserInfoDto[]> {
        return this._users;
    }

    async createUserInfo(userInfoDto: UserInfoCreateDto): Promise<UserInfoDto> {
        userInfoDto.id = uuid();
        const userInfo: UserInfoEntity = userInfoDto;
        this._users.push(userInfo);

        return toPromise(mapToUserInfoDto(userInfo));
    }
}