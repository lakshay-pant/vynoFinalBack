import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';
export type MomoDocument = Momo & Document;

@Schema()
export class Momo {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true })
    user_id: User;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  created_at: string;
  
}

export const MomoSchema = SchemaFactory.createForClass(Momo);