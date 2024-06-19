import { Controller, Get, Post, Body, Patch, Put, Param, Delete, Query } from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';

@Controller('/api/records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post('create')
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(createRecordDto);
  }

  @Get()
  findAll() {
    return this.recordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recordsService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateRecordDto: UpdateRecordDto) {
    return this.recordsService.update(id, updateRecordDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.recordsService.remove(id);
  }

  @Get('search')
  searchByName(@Query('name') name: string) {
    return this.recordsService.searchByName(name);
  }
}
