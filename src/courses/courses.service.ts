import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseDocument } from './interfaces/course.interface';
import { Course } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course>
  ) { }

  async create(createCourseDto: CreateCourseDto): Promise<CourseDocument> {
    const newCourse = new this.courseModel(createCourseDto);
    return await newCourse.save();
  }

  async findAll(): Promise<CourseDocument[]> {
    return await this.courseModel.find().exec();
  }

  async findOne(id: string): Promise<CourseDocument> {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const updated = await this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true }).exec();
    if (!updated) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<Course> {
    const deleted = await this.courseModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return deleted;
  }
}
