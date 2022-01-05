import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Schema as MongooseSchema} from 'mongoose';

import {Role} from './role.schema';

export type CustomerDocument = Customer & Document;

export type ICustomer = Customer;

@Schema({
    autoCreate: true,
})
export class Customer {

    @Prop({unique: true, required: true})
    id: string;

    @Prop({unique: true, required: true, instance: 'String'})
    userName: string;

    @Prop({unique: true, required: true, instance: 'String'})
    email: string;

    @Prop({required: true, instance: 'String'})
    password: string;

    @Prop({required: true, instance: 'String'})
    firstName: string;

    @Prop({instance: 'Number'})
    age: number;

    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Role'})
    role: Role;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
