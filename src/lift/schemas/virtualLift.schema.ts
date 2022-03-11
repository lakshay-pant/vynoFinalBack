import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';

export type VirtualLiftDocument = VirtualLift & Document;

@Schema()
export class VirtualLift {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true })
  user_id: User;

  @Prop({ required: true })
  type: string;

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

  @Prop()
  price: number;

  @Prop()
  departure_time: string;

  @Prop({default: false})
  is_occasional: boolean;

  @Prop()
  occasional: string;

  @Prop({default: false})
  is_frequent: boolean;

  @Prop({type: Object})
  frequent: string;

  @Prop({default: false})
  is_come_back: boolean;

  @Prop()
  lift_come_back_time: string;

  @Prop({default: false})
  is_pick_preference: boolean;

  @Prop({default: ''})
  distance: string;

  @Prop({type: Object})
  drop_off:Object;

  @Prop({type: Object})
    pick_preferences:{
          pickup: Object,
          gender: string,
          air_condition: string,
          pvt_lift: string,
          car : string
    }
  @Prop({default: false})
  is_active: boolean;

  @Prop({ type: Object})
  rejected_id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  accepted_id: User;

  @Prop({default: false})
  approval: boolean;

  @Prop()
  created_at: string;

  @Prop()
  updated_at: string;

}

export const VirtualLiftSchema = SchemaFactory.createForClass(VirtualLift);