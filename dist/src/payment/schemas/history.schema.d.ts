import { Document } from 'mongoose';
import { Payment } from '../schemas/payment.schema';
import { LiftBooking } from '../../lift/schemas/liftBooking.schema';
import * as mongoose from 'mongoose';
export declare type HistoryDocument = History & Document;
export declare class History {
    type: string;
    payment_id: Payment;
    booking_id: LiftBooking;
    created_at: string;
}
export declare const HistorySchema: mongoose.Schema<Document<History, any, any>, mongoose.Model<Document<History, any, any>, any, any, any>, {}>;
