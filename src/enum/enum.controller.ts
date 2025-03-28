import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnumService } from './enum.service';
import { CreateEnumDto } from './dto/create-enum.dto';
import { UpdateEnumDto } from './dto/update-enum.dto';

@Controller('enum')
export class EnumController {
  constructor(private readonly enumService: EnumService) {}

  @Post()
  create(@Body() createEnumDto: CreateEnumDto) {
    return this.enumService.create(createEnumDto);
  }

  @Get()
  findAll() {
    return this.enumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnumDto: UpdateEnumDto) {
    return this.enumService.update(+id, updateEnumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enumService.remove(+id);
  }
}
