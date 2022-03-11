import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';
export declare type PaymentDocument = Payment & Document;
export declare class Payment {
    user_id: User;
    request_uuid: string;
    amount: string;
    status: string;
    message: string;
    created_at: string;
}
export declare const PaymentSchema: mongoose.Schema<Document<Payment, any, any>, mongoose.Model<Document<Payment, any, any>, any, any, any>, {}>;
