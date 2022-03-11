import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';
export declare type VirtualLiftDocument = VirtualLift & Document;
export declare class VirtualLift {
    user_id: User;
    type: string;
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
    departure_time: string;
    is_occasional: boolean;
    occasional: string;
    is_frequent: boolean;
    frequent: string;
    is_come_back: boolean;
    lift_come_back_time: string;
    is_pick_preference: boolean;
    distance: string;
    drop_off: Object;
    pick_preferences: {
        pickup: Object;
        gender: string;
        air_condition: string;
        pvt_lift: string;
        car: string;
    };
    is_active: boolean;
    rejected_id: string;
    accepted_id: User;
    approval: boolean;
    created_at: string;
    updated_at: string;
}
export declare const VirtualLiftSchema: mongoose.Schema<Document<VirtualLift, any, any>, mongoose.Model<Document<VirtualLift, any, any>, any, any, any>, {}>;
