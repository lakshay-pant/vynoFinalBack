import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    first_name: string;
    last_name: string;
    email: string;
    country_code: string;
    phone_number: string;
    verify_otp: string;
    gender: string;
    dob: string;
    profession: string;
    profile: string;
    driving_licence: string;
    cnic: string;
    license: string;
    registration: string;
    insurance: string;
    account_status: string;
    fcm: string;
    role: string;
    wallet_amount_user: number;
    wallet_amount_driver: number;
    created_at: string;
    updated_at: string;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, {}>;
