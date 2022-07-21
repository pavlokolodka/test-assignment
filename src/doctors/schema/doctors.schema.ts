import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type DoctorDocument = Doctor & Document;

@Schema()
export class Doctor {
  @Prop({default: uuid})
  _id: string;

  @Prop({unique: true})
  email: String;

  @Prop()
  name: String;

  @Prop()
  spec: String;

  @Prop({ type: String, ref: 'Appointment' })
  slots: [{ id: String }];
}


export const DoctorSchema = SchemaFactory.createForClass(Doctor);