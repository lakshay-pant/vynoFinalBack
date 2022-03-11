import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import * as mongoose from 'mongoose';

export type DocumentsDocument = Documents & Document;

@Schema()
export class Documents {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true })
  user_id: User;

  @Prop({ required: true })
  role: string;

  @Prop()
  driving_licence: string;

  @Prop()
  cnic: string;

  @Prop()
  registration: string;

  @Prop()
  insurance: string;

  @Prop()
  account_status: string;

  @Prop()
  created_at: string;

  @Prop()
  updated_at: string;

}

export const DocumentsSchema = SchemaFactory.createForClass(Documents);