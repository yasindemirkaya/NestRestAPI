import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, minlength: 2 })
  first_name: string;

  @Prop({ required: true, minlength: 2 })
  last_name: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: false })
  is_verified: boolean;

  @Prop({ required: true, enum: [0, 1, 2], default: 0 })
  role: number;

  @Prop({ default: null })
  created_by: string;

  @Prop({ default: null })
  updated_by: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
