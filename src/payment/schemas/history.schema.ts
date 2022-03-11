import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Payment, PaymentSchema } from '../schemas/payment.schema';
import { LiftBooking, LiftBookingSchema } from '../../lift/schemas/liftBooking.schema';
import * as mongoose from 'mongoose';
export type HistoryDocument = History & Document;

@Schema()
export class History {

  @Prop({
    type: String,
    required: true,
    enum: ['credit','debit'],
  })
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' })
  payment_id: Payment;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'LiftBooking' })
  booking_id: LiftBooking;  
 
  @Prop()
  created_at: string;
  
}

export const HistorySchema = SchemaFactory.createForClass(History);