import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {

    @Prop({unique: true})
    id: string;

    @Prop()
    customerId: string;

    @Prop()
    isRevoked: boolean;

    @Prop()
    expires: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
