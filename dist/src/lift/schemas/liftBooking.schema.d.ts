import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';
import { LiftRequest } from './liftRequest.schema';
export declare type LiftBookingDocument = LiftBooking & Document;
export declare class LiftBooking {
    lift_request_id: LiftRequest;
    user_id: User;
    driver_id: User;
    to: {
        lat: string;
        long: string;
        address: string;
    };
    from: {
        lat: string;
        long: string;
        address: string;
    };
    passenger: number;
    price: number;
    is_virtual: boolean;
    distance: string;
    date: string;
    is_cancle: boolean;
    cancle_by: string;
    status: string;
    created_at: string;
    updated_at: string;
}
export declare const LiftBookingSchema: mongoose.Schema<Document<LiftBooking, any, any>, mongoose.Model<Document<LiftBooking, any, any>, any, any, any>, {}>;
