import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';
import { LiftRequest } from './liftRequest.schema';
export declare type LiftNotificationDocument = LiftNotification & Document;
export declare class LiftNotification {
    lift_request_id: LiftRequest;
    user_id: User;
    driver_id: User;
    notify_from: string;
    message: string;
    is_virtual: boolean;
    virtual_lift_price: string;
    created_at: string;
    updated_at: string;
}
export declare const LiftNotificationSchema: mongoose.Schema<Document<LiftNotification, any, any>, mongoose.Model<Document<LiftNotification, any, any>, any, any, any>, {}>;
