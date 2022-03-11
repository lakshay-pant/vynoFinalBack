import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';
export declare type DocumentsDocument = Documents & Document;
export declare class Documents {
    user_id: User;
    role: string;
    driving_licence: string;
    cnic: string;
    registration: string;
    insurance: string;
    account_status: string;
    created_at: string;
    updated_at: string;
}
export declare const DocumentsSchema: mongoose.Schema<Document<Documents, any, any>, mongoose.Model<Document<Documents, any, any>, any, any, any>, {}>;
