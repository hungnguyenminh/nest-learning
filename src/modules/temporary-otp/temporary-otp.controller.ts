import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TemporaryOtpService } from './temporary-otp.service';
import { CreateTemporaryOtpDto } from './dto/create-temporary-otp.dto';
import { UpdateTemporaryOtpDto } from './dto/update-temporary-otp.dto';

@Controller('temporary-otp')
export class TemporaryOtpController {
  constructor(private readonly temporaryOtpService: TemporaryOtpService) {}

  @Post()
  create(@Body() createTemporaryOtpDto: CreateTemporaryOtpDto) {
    return this.temporaryOtpService.create(createTemporaryOtpDto);
  }

  @Get()
  findAll() {
    return this.temporaryOtpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.temporaryOtpService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTemporaryOtpDto: UpdateTemporaryOtpDto) {
    return this.temporaryOtpService.update(+id, updateTemporaryOtpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.temporaryOtpService.remove(+id);
  }
}
