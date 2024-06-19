import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';
import { CreateRecordDto } from 'src/patient-registration/records/dto/create-record.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
    name?: string;
    middleName?: string; 
    surname?: string;
    dateOfBirth?: Date; 
    homeAddress?: string;
    dateOfReg?: Date; 
    _22120612872?: boolean;
    record?: CreateRecordDto;
}
