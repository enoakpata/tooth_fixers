import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('/api/patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post('create')
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const patientId = parseInt(id, 10);
    if (isNaN(patientId)) {
      throw new HttpException('Invalid patient ID', HttpStatus.BAD_REQUEST);
    }
    return this.patientsService.findOne(patientId);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    const patientId = parseInt(id, 10);
    if (isNaN(patientId)) {
      throw new HttpException('Invalid patient ID', HttpStatus.BAD_REQUEST);
    }
    return this.patientsService.update(patientId, updatePatientDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    const patientId = parseInt(id, 10);
    if (isNaN(patientId)) {
      throw new HttpException('Invalid patient ID', HttpStatus.BAD_REQUEST);
    }
    return this.patientsService.remove(patientId);
  }

  @Patch(':patientId/record/:recordId')
  setRecordById(@Param('patientId') patientId: string, @Param('recordId') recordId: string) {
    const pid = parseInt(patientId, 10);
    const rid = parseInt(recordId, 10);
    if (isNaN(pid) || isNaN(rid)) {
      throw new HttpException('Invalid patient ID or record ID', HttpStatus.BAD_REQUEST);
    }
    return this.patientsService.setRecordById(pid, rid);
  }

  @Delete(':patientId/record')
  unsetRecordById(@Param('patientId') patientId: string) {
    const pid = parseInt(patientId, 10);
    if (isNaN(pid)) {
      throw new HttpException('Invalid patient ID', HttpStatus.BAD_REQUEST);
    }
    return this.patientsService.unsetRecordById(pid);
  }

  @Get('/search/patient/')
  search(@Query('name') name: string) {
    if (!name || name.trim().length === 0) {
      throw new HttpException('Invalid patient name', HttpStatus.BAD_REQUEST);
    }
    return this.patientsService.searchName(name);
  }
}
