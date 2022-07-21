import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './schema/doctors.schema';
import { InjectModel } from '@nestjs/mongoose';
import {v4 as uuidv4} from 'uuid';
import { Appointment, AppointmentDocument } from 'src/appointments/schema/appointments.schema';

@Injectable()
export class DoctorsService {
  
}
