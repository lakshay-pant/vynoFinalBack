import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';
export declare type AddressDocument = Address & Document;
export declare class Address {
    user_id: User;
    type: string;
    lat: string;
    long: string;
    address: string;
    landmark: string;
    country: string;
    state: string;
    city: string;
    pin_Code: string;
    created_at: string;
    updated_at: string;
}
export declare const AddressSchema: mongoose.Schema<Document<Address, any, any>, mongoose.Model<Document<Address, any, any>, any, any, any>, {}>;
