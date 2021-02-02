import {Body, Controller, Get, Header, HttpCode, HttpStatus, Post} from '@nestjs/common';

import {UserInfoService} from '../../shared/services/user-info.service';
import {UserInfo} from './schema/user-info.schema';
import {UserInfoCreateDto} from './dto/user-info-create.dto';

@Controller('api/user-info')
export class UserInfoController {

    constructor (private readonly _userInfoService: UserInfoService) {
    }

    @Get('all')
    async findAll(): Promise<UserInfo[]> {
        return this._userInfoService.getAllUserInfos();
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'no-cache')
    create(@Body() userInfoCreateDto: UserInfoCreateDto): Promise<UserInfo> {
        return this._userInfoService.createUserInfo(userInfoCreateDto);
    }

    /*@Get('find')
    async findOneUserInfo(@Query('id') id: string): Promise<UserInfoDto> {
        return await this._userInfoService.
    }*/

    /*@Post('create')
    async createUserInfo(@Body() userInfoCreateDto: UserInfoCreateDto): Promise<UserInfoDto> {
        return await this._userInfoService.createUserInfo(userInfoCreateDto);
    }*/

    /*
    Will be implemented in future
    @Delete(':id')
    async deleteUserInfo(@Param('id') id: string): Promise<UserInfoDto> {
        return await this._userInfoService.deleteUserInfo(id);
    }*/
}