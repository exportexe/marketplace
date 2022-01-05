import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {v4 as uuidv4} from 'uuid';

import {RoleDto} from '../../dto';
import {UserRole} from '../../enums';
import {IRole, Role, RoleDocument} from '../../schemas';
import {AbstractRolesService} from '../abstract-roles.service';

@Injectable()
export class RolesService extends AbstractRolesService {

    constructor(@InjectModel(Role.name) private _roleModel: Model<RoleDocument>) {
        super();
    }

    async getRoleByType(type: UserRole): Promise<IRole> {
        return this._roleModel.findOne({type});
    }

    async createRole(roleRequestDto: RoleDto): Promise<IRole> {
        roleRequestDto.id = uuidv4();

        return new this._roleModel(roleRequestDto).save();
    }
}