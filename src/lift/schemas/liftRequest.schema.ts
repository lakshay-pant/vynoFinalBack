import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';
import { Lift, LiftSchema } from './lift.schema';
export type LiftRequestDocument = LiftRequest & Document;

@Schema()
export class LiftRequest {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true })
  user_id: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lift' ,required: true })
  lift_id: Lift;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true })
  driver_id: User;
  
  @Prop({ required: true })
  passenger: number;

  @Prop({
    type: String,
    required: true,
    enum: ['inititate','accepted','rejected'],
  })
  user_status: string;

  @Prop({
    type: String,
    required: true
  })
  date: string;

  
  @Prop({
    type: String,
    enum: ['pending','accepted','rejected'],
  })
  driver_status: string;

  @Prop()
  created_at: string;

  @Prop()
  created_at_time: string;

  @Prop()
  updated_at: string;

}

export const LiftRequestSchema = SchemaFactory.createForClass(LiftRequest);