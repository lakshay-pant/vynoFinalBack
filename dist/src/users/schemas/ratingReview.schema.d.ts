import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';
export declare type RatingReviewDocument = RatingReview & Document;
export declare class RatingReview {
    to: User;
    rating: string;
    rating_for: string;
    created_at: string;
    updated_at: string;
}
export declare const RatingReviewSchema: mongoose.Schema<Document<RatingReview, any, any>, mongoose.Model<Document<RatingReview, any, any>, any, any, any>, {}>;
