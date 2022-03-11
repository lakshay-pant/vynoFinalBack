import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';
export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true })
  user_id: User;

  @Prop()
  request_uuid: string;

  @Prop()
  amount: string;

  @Prop()
  status: string;
  
  @Prop()
  message:string;
 
  @Prop()
  created_at: string;
  
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);