import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {UserInfo, UserInfoDocument} from '../../modules/user-info/schema/user-info.schema';
import {UserInfoCreateDto} from '../../modules/user-info/dto/user-info-create.dto';

@Injectable()
export class UserInfoService {

    constructor(@InjectModel(UserInfo.name) private userInfoModel: Model<UserInfoDocument>) {
    }

    /*async getUserInfoById(id: string): Promise<UserInfoDto> {
        return this.userInfoModel.findById(id);
    }*/

    async getAllUserInfos(): Promise<UserInfo[]> {
        return this.userInfoModel.find().exec();
    }

    async createUserInfo(userInfoCreateDto: UserInfoCreateDto): Promise<UserInfo> {
        const newUserInfo: UserInfoDocument = new this.userInfoModel(userInfoCreateDto);

        return newUserInfo.save();
    }
}