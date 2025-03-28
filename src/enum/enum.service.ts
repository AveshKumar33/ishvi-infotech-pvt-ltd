import { Injectable } from '@nestjs/common';
import { CreateEnumDto } from './dto/create-enum.dto';
import { UpdateEnumDto } from './dto/update-enum.dto';

@Injectable()
export class EnumService {
  create(createEnumDto: CreateEnumDto) {
    return 'This action adds a new enum';
  }

  findAll() {
    return `This action returns all enum`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enum`;
  }

  update(id: number, updateEnumDto: UpdateEnumDto) {
    return `This action updates a #${id} enum`;
  }

  remove(id: number) {
    return `This action removes a #${id} enum`;
  }
}
