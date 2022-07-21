import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppointmentsModule } from './appointments/appointments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { DoctorsModule } from './doctors/doctors.module';


@Module({
  imports: [AppointmentsModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGODB_URI), UsersModule, DoctorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
