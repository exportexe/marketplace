import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type RefreshTokenDocument = RefreshToken;

@Schema()
export class RefreshToken extends Document {

    @Prop()
    customerId: string;

    @Prop()
    isRevoked: boolean;

    @Prop()
    expires: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
