import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { User } from '../../users/schema/users.schema';
import { Doctor } from '../../doctors/schema/doctors.schema';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop({default: uuid})
  _id: string;

  @Prop({ type: String, ref: 'User' })
  userId: User;

  @Prop({ type: String, ref: 'Doctor' })
  doctorId: Doctor;

  @Prop({default: true})
  IsActive: Boolean;

  @Prop()
  slot: Date;
}


export const AppointmentSchema = SchemaFactory.createForClass(Appointment);