import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop()
  country_code: string;

  @Prop()
  phone_number: string;

  @Prop()
  verify_otp: string;

  @Prop()
  gender: string;

  @Prop()
  dob: string;

  @Prop()
  profession: string;

  @Prop()
  profile: string;
  
  @Prop()
  driving_licence: string;

  @Prop()
  cnic: string;

  @Prop()
  license: string;

  @Prop()
  registration: string;

  @Prop()
  insurance: string;

  @Prop()
  account_status: string;

  @Prop()
  fcm: string;

  @Prop()
  role: string;

  @Prop({ required: true ,default: 0})
  wallet_amount_user: number;

  @Prop({ required: true ,default: 0})
  wallet_amount_driver: number;

  @Prop()
  created_at: string;

  @Prop()
  updated_at: string;

  
}

export const UserSchema = SchemaFactory.createForClass(User);