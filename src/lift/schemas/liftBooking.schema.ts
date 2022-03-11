import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';
import { Lift } from './lift.schema';
import { LiftRequest } from './liftRequest.schema';
export type LiftBookingDocument = LiftBooking & Document;

@Schema()
export class LiftBooking {


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'LiftRequest'})
  lift_request_id: LiftRequest;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true })
  user_id: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true })
  driver_id: User;

  @Prop({type: Object, required: true })
  to: {
    lat:string,
    long:string,
    address:string
  };


  @Prop({type: Object, required: true })
  from:{
    lat:string,
    long:string,
    address:string
  };

  @Prop({ required: true })
  passenger: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true ,default: false})
  is_virtual: boolean;

  @Prop({default: ''})
  distance: string;

  @Prop({
    type: String,
    required: true
  })
  date: string;

  @Prop({
    type: String,
    required: true,
    default: false
  })
  is_cancle: boolean;

 
  @Prop({
    type: String,
    enum: ['user','driver'],
  })
  cancle_by: string;

  @Prop({
    type: String,
    enum: ['active','completed','inactive'],
    default: 'inactive'
  })
  status: string;

  @Prop()
  created_at: string;


  @Prop()
  updated_at: string;

}

export const LiftBookingSchema = SchemaFactory.createForClass(LiftBooking);