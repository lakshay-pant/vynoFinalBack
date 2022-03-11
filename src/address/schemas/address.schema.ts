import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';
export type AddressDocument = Address & Document;

@Schema()
export class Address {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  lat: string;

  @Prop({ required: true })
  long: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  landmark: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  pin_Code:string;

  @Prop()
  created_at: string;

  @Prop()
  updated_at: string;

  
}

export const AddressSchema = SchemaFactory.createForClass(Address);