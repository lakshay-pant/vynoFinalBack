import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';

export type RatingReviewDocument = RatingReview & Document;

@Schema()
export class RatingReview {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true })
  to: User;

  @Prop()
  rating: string;

  @Prop()
  rating_for: string;

  @Prop()
  created_at: string;

  @Prop()
  updated_at: string;

}

export const RatingReviewSchema = SchemaFactory.createForClass(RatingReview);