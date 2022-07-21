import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment, AppointmentDocument } from './schema/appointments.schema';
import { User, UserDocument } from '../users/schema/users.schema';
import { DoctorDocument } from 'src/doctors/schema/doctors.schema';
import { Doctor } from '../doctors/schema/doctors.schema';
import fs from 'fs';
import path from 'path';

@Injectable()
export class AppointmentsService {

  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    ) {this.sendNotification()}

  async create(dto: CreateAppointmentDto) {
    const userId = dto.userId;
    const doctorId = dto.doctorId;
    const appointmentDate = dto.slot;

    if (!(userId && doctorId && appointmentDate)) throw new HttpException('userId or doctorId or date not passed', HttpStatus.BAD_REQUEST);

    const user = await this.userModel.findOne({id: userId});
    const doctor = await this.doctorModel.findOne({id: doctorId});
     
    if (doctor && user) {
      const appointment = await this.appointmentModel.create({
        userId: userId,
        doctorId: doctorId,
        slot: appointmentDate
      });
    
      if (this.checkExpiration(appointment)) throw new HttpException('appointment date expired', HttpStatus.BAD_REQUEST);

      return dto;
     
    } 

    throw new HttpException('userId or doctorId not exist', HttpStatus.NOT_FOUND);
}
  private async checkExpiration(appointment: Appointment & AppointmentDocument) {
    const date = appointment.slot;

    if (Number(date) < Date.now()) {
      appointment.IsActive = false;
      await appointment.save();
      return false;
    }

    return true;
  }

  private async sendNotification() {
    const oneDay = 86400000;
    const oneHour = 3600000;
    setInterval(async () => {
      const appointments = await this.appointmentModel.find().populate('userId').populate('doctorId');
      appointments.forEach(async (appointment) => {
        if (!appointment.userId.oneDay) {
          if (Number(appointment.slot) <= Date.now() + oneDay) {
            const user = await this.userModel.findOne({_id: appointment.userId._id});
            user!.oneDay = true;
            const dataOneDay = `${Date.now()} | Привет ${appointment.userId.name}! Напоминаем что вы записаны к ${appointment.doctorId.spec} завтра в ${appointment.slot}!`
            fs.writeFile(path.resolve(__dirname, 'notification.log'), dataOneDay, err => {
              if (err) {
                console.error(err);
              }
            });
            await user!.save();
          }
        }
        else if (!appointment.userId.oneHour) {
          if (Number(appointment.slot) <= Date.now() + oneHour) {
            const user = await this.userModel.findOne({_id: appointment.userId._id});
            user!.oneHour = true;
            const dataOneDay = `${Date.now()} | Привет ${appointment.userId.name}! Вам через 2 часа к ${appointment.doctorId.spec}  в ${appointment.slot}!`
            fs.writeFile(path.resolve(__dirname, 'notification.log'), dataOneDay, err => {
              if (err) {
                console.error(err);
              }
            });
            await user!.save();
          }
        }
      })
    }, oneHour);
  }
}
