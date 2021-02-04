import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {

    @Prop({unique: true, required: true})
    id: string;

    @Prop({unique: true, required: true})
    userName: string;

    @Prop({unique: true, required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop()
    firstName: string;

    @Prop()
    age: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
