import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {v4 as uuidv4} from 'uuid';

import {RefreshToken, RefreshTokenDocument} from '../../schema/refresh-token.schema';
import {AbstractRefreshTokenRepository} from '../abstract-refresh-token.repository';

@Injectable()
export class RefreshTokenRepository extends AbstractRefreshTokenRepository {

    constructor(@InjectModel(RefreshToken.name) private _refreshTokenModel: Model<RefreshTokenDocument>) {
        super();
    }

    async createRefreshToken(customerId: string, ttl: number): Promise<RefreshToken> {
        const token: RefreshToken = new RefreshToken();
        const expiration: Date = new Date();

        token.id = uuidv4();
        token.customerId = customerId;
        token.isRevoked = false;
        expiration.setTime(expiration.getTime() + ttl);
        token.expires = expiration;

        return new this._refreshTokenModel(token).save();
    }

    async findTokenById(id: string): Promise<RefreshToken | null> {
        return this._refreshTokenModel.findOne({id});
    }

    async findAndRevokeTokenById(id: string): Promise<RefreshToken> {
        return this._refreshTokenModel.findOneAndUpdate({id}, {$set: {isRevoked: true}}, {new: true});
    }
}
