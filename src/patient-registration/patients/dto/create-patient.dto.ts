import { CreateRecordDto } from "src/patient-registration/records/dto/create-record.dto";
export class CreatePatientDto {
    
    readonly name?: string;
    readonly middleName: string; 
    readonly surname?: string;
    readonly dateOfBirth: Date; 
    readonly homeAddress?: string;
    readonly dateOfReg?: Date; 
    readonly _22120612872?: boolean;
    record: CreateRecordDto;
    
}
