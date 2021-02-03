import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type CustomerDocument = Customer;

@Schema()
export class Customer extends Document {

    @Prop({unique: true})
    userName: string;

    @Prop({unique: true})
    email: string;

    @Prop()
    firstName: string;

    @Prop()
    age: number;

    @Prop()
    password: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
