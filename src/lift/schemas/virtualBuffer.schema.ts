import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { LiftBooking, LiftBookingSchema } from '../schemas/liftBooking.schema';
import * as mongoose from 'mongoose';


export type VirtualBufferDocument = VirtualBuffer & Document;
@Schema()
export class VirtualBuffer {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true })
  user_id: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'LiftBooking' ,required: true })
  booking_id: LiftBooking;

  @Prop()
  amount: number;

  @Prop()
  created_at: string;

}

export const VirtualBufferSchema = SchemaFactory.createForClass(VirtualBuffer);