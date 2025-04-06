import { Injectable } from '@nestjs/common';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Semester } from './schemas/semester.schema';

@Injectable()
export class SemestersService {
  constructor(@InjectModel('Semester') private readonly semesterModel: Model<Semester>) { }

  async create(createSemesterDto: CreateSemesterDto): Promise<Semester> {
    const newSemester = new this.semesterModel(createSemesterDto);
    return newSemester.save();
  }

  async findAll(): Promise<Semester[]> {
    return this.semesterModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    return this.semesterModel.findById(id).exec();
  }

  async update(id: string, updateSemesterDto: UpdateSemesterDto): Promise<any> {
    return this.semesterModel.findByIdAndUpdate(id, updateSemesterDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.semesterModel.findByIdAndDelete(id).exec();
  }
}