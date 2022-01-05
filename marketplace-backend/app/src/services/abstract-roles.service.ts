import {RoleDto} from '../dto';
import {UserRole} from '../enums';
import {IRole} from '../schemas';

export abstract class AbstractRolesService {

    abstract createRole(roleRequestDto: RoleDto): Promise<IRole>;

    abstract getRoleByType(type: UserRole): Promise<IRole>;
}