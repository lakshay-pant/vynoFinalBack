import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';
export declare type MomoDocument = Momo & Document;
export declare class Momo {
    user_id: User;
    username: string;
    password: string;
    created_at: string;
}
export declare const MomoSchema: mongoose.Schema<Document<Momo, any, any>, mongoose.Model<Document<Momo, any, any>, any, any, any>, {}>;
