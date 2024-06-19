import { Module } from '@nestjs/common';
import { PatientsModule } from './patients/patients.module';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [PatientsModule, RecordsModule]
})
export class PatientRegistrationModule {}
