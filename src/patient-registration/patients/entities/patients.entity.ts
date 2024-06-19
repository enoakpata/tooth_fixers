import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Record } from "src/patient-registration/records/entities/records.entity"

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    name: string;
    @Column()
    middleName: string;
    @Column({ nullable: true })
    surname: string;
    @Column()
    dateOfBirth: Date;
    @Column({ nullable: true })
    homeAddress: string;
    @Column({ nullable: true })
    dateOfReg: Date;
    @Column({default: true})
    _22120612872: boolean;

    @JoinColumn()
    @OneToOne(type => Record, record => record.patient, {cascade:true})
    record: Record;

}
