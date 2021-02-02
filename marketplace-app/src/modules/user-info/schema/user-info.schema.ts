import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type UserInfoDocument = UserInfo & Document;

@Schema()
export class UserInfo {

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    userName: string;

    @Prop()
    age: number;

    @Prop()
    sex: string;
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);