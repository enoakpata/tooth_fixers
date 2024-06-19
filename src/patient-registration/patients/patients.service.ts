import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patients.entity';
import { Record } from '../records/entities/records.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const newPatient: Patient = this.patientsRepository.create(createPatientDto);

    try {
      if (createPatientDto.record) {
        const newRecord = this.recordsRepository.create(createPatientDto.record);
        const record: Record = await this.recordsRepository.save(newRecord);
        newPatient.record = record;
      }
      const savedPatient = await this.patientsRepository.save(newPatient);
      return savedPatient;
    } catch (error) {
      throw new HttpException('Failed to create patient', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return await this.patientsRepository.find();
  }

  async findOne(id: number) {
    const patient = await this.patientsRepository.findOne({
      where: { id },
      relations: ['record'],
    });

    if (!patient) {
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }

    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const existingPatient = await this.findOne(id);

    if (!existingPatient) {
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }

    const updatedPatient = Object.assign(existingPatient, updatePatientDto);
    return this.patientsRepository.save(updatedPatient);
  }

  async remove(id: number) {
    const existingPatient = await this.findOne(id);

    if (!existingPatient) {
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }

    return this.patientsRepository.delete(id);
  }

  async setRecordById(patientId: number, recordId: number) {
    try {
      return await this.patientsRepository.createQueryBuilder()
        .relation(Patient, 'record')
        .of(patientId)
        .set(recordId);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem setting record for patient: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async unsetRecordById(patientId: number) {
    try {
      return await this.patientsRepository.createQueryBuilder()
        .relation(Patient, 'record')
        .of(patientId)
        .set(null);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem unsetting record for patient: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchName(name: string): Promise<Patient[]> {
    try {
      return await this.patientsRepository.find({
        where: { name: Like(`%${name}%`) },
      });
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
