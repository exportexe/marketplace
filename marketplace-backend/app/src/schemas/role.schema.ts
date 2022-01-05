import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type RoleDocument = Role & Document;

export type IRole = Role;

@Schema({
    autoCreate: true,
})
export class Role {

    @Prop({unique: true, required: true, instance: 'String'})
    id: string;

    @Prop({unique: true, required: true, instance: 'String'})
    type: string;

    @Prop({instance: 'String'})
    description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);