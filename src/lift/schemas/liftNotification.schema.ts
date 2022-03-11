import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';
import { Lift } from './lift.schema';
import { LiftRequest } from './liftRequest.schema';
export type LiftNotificationDocument = LiftNotification & Document;

@Schema()
export class LiftNotification {


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'LiftRequest' ,required: true })
  lift_request_id: LiftRequest;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true })
  user_id: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true })
  driver_id: User;
 

  @Prop({
    type: String,
    required: true
  })
  notify_from: string;

  @Prop({
    type: String,
    required: true
  })
  message: string;

  @Prop({default: false})
  is_virtual: boolean;

  @Prop({
    type: String,
    required: false
  })
  virtual_lift_price: string;


  @Prop()
  created_at: string;

  @Prop()
  updated_at: string;

}

export const LiftNotificationSchema = SchemaFactory.createForClass(LiftNotification);