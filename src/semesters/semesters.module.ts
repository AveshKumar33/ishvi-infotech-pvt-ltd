import { Module } from '@nestjs/common';
import { SemestersService } from './semesters.service';
import { SemestersController } from './semesters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Semester, SemesterSchema } from './schemas/semester.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Semester.name, schema: SemesterSchema }])],
  controllers: [SemestersController],
  providers: [SemestersService],
})
export class SemestersModule { }
