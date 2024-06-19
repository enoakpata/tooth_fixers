import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patients.entity';
import { Record } from '../records/entities/records.entity';
import { RecordsController } from '../records/records.controller';
import { RecordsService } from '../records/records.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Record])],
  controllers: [PatientsController, RecordsController],
  providers: [PatientsService, RecordsService],
})
export class PatientsModule {}
