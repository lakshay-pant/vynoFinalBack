import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { LiftBooking } from '../schemas/liftBooking.schema';
import * as mongoose from 'mongoose';
export declare type VirtualBufferDocument = VirtualBuffer & Document;
export declare class VirtualBuffer {
    user_id: User;
    booking_id: LiftBooking;
    amount: number;
    created_at: string;
}
export declare const VirtualBufferSchema: mongoose.Schema<Document<VirtualBuffer, any, any>, mongoose.Model<Document<VirtualBuffer, any, any>, any, any, any>, {}>;
