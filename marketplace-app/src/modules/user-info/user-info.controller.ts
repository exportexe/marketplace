import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';

import {UserInfoService} from '../../shared/services/user-info.service';
import {UserInfoDto} from './dto/user-info-dto.model';
import {UserInfoCreateDto} from './dto/user-info-create-dto.model';

@Controller('api/user-info')
export class UserInfoController {

    constructor (private _userInfoService: UserInfoService) {
    }

    @Get('find')
    async findOneUserInfo(@Query('id') id: string): Promise<UserInfoDto> {
        return await this._userInfoService.getOneUserInfo(id);
    }

    @Get('findAll')
    async findAll(): Promise<UserInfoDto[]> {
        return await this._userInfoService.getAllUserInfos();
    }

    @Post('create')
    async createUserInfo(@Body() userInfoCreateDto: UserInfoCreateDto): Promise<UserInfoDto> {
        return await this._userInfoService.createUserInfo(userInfoCreateDto);
    }

    /*
    Will be implemented in future
    @Delete(':id')
    async deleteUserInfo(@Param('id') id: string): Promise<UserInfoDto> {
        return await this._userInfoService.deleteUserInfo(id);
    }*/
}