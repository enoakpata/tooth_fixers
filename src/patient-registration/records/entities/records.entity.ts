import { Patient } from "src/patient-registration/patients/entities/patients.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";

@Entity()
export class Record {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable:true})
    clinicDate: Date;
    @Column({nullable:true})
    natOfAilment: string;
    @Column({nullable:true})
    medsPrescribed: string;
    @Column({nullable:true})
    procedureUndertaken: string;
    @Column({nullable:true})
    dateOfNextAppt: Date;

    @OneToOne(type => Patient, patient => patient.record )
    patient: Patient;
    

}
