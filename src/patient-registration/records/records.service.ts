import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record } from './entities/records.entity';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
  ) {}

  async create(createRecordDto: CreateRecordDto) {
    const newRecord: Record = this.recordsRepository.create(createRecordDto);
    return this.recordsRepository.save(newRecord);
  }

  async findAll() {
    return await this.recordsRepository.find();
  }

  async findOne(id: number) {
    const record = await this.findOne(id);
    if (!record) {
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
    }
    return record;
  }

  async update(id: number, updateRecordDto: UpdateRecordDto) {
    const existingRecord = await this.findOne(id);
    const updatedRecord = Object.assign(existingRecord, updateRecordDto);
    return this.recordsRepository.save(updatedRecord);
  }

  async remove(id: number) {
    const existingRecord = await this.findOne(id);
    return this.recordsRepository.remove(existingRecord);
  }

  async searchByName(name: string): Promise<Record[]> {
    return await this.recordsRepository
      .createQueryBuilder('record')
      .where('record.name LIKE :name', { name: `%${name}%` })
      .getMany();
  }
}
