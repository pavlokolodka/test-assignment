import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({default: uuid})
  _id: string;

  @Prop({unique: true})
  email: String;

  @Prop()
  name: String;

  @Prop()
  phone: String;

  @Prop({default: false})
  oneDay: Boolean;


  @Prop({default: false})
  oneHour: Boolean;
}


export const UserSchema = SchemaFactory.createForClass(User);