import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from './schema/doctors.schema';
import { DoctorsService } from './doctors.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }])],
  providers: [DoctorsService],
  exports: [MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]), DoctorsService],
})
export class DoctorsModule {}
