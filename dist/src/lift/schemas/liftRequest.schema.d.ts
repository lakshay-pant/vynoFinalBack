import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';
import { Lift } from './lift.schema';
export declare type LiftRequestDocument = LiftRequest & Document;
export declare class LiftRequest {
    user_id: User;
    lift_id: Lift;
    driver_id: User;
    passenger: number;
    user_status: string;
    date: string;
    driver_status: string;
    created_at: string;
    created_at_time: string;
    updated_at: string;
}
export declare const LiftRequestSchema: mongoose.Schema<Document<LiftRequest, any, any>, mongoose.Model<Document<LiftRequest, any, any>, any, any, any>, {}>;
