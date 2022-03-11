import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';

export type LiftDocument = Lift & Document;

@Schema()
export class Lift {

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

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
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
  @Prop({default: true})
  is_active: boolean;

  @Prop({ required: true ,default: false})
  is_virtual: boolean;
  
  @Prop()
  created_at: string;

  @Prop()
  updated_at: string;

}

export const LiftSchema = SchemaFactory.createForClass(Lift);