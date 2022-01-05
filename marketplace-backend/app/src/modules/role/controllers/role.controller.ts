import {Body, Controller, Get, Param, Post} from '@nestjs/common';

import {RoleDto} from '../../../dto';
import {UserRole} from '../../../enums';
import {IRole} from '../../../schemas';
import {AbstractRolesService} from '../../../services';

@Controller('/api/v1/role')
export class RoleController {

    constructor(private _rolesService: AbstractRolesService) {
    }

    @Get(':type')
    getRoleByType(@Param('type') type: UserRole): Promise<IRole> {
        return this._rolesService.getRoleByType(type);
    }

    @Post('/create')
    createNewRole(@Body() roleRequestDto: RoleDto): Promise<IRole> {
        return this._rolesService.createRole(roleRequestDto);
    }
}