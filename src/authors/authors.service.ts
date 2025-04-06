import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './interfaces/author.interface';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel('Author') private readonly authorModel: Model<Author>) { }

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const newAuthor = new this.authorModel(createAuthorDto);
    return newAuthor.save();
  }

  async findAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    return this.authorModel.findById(id).exec();
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<any> {
    return this.authorModel.findByIdAndUpdate(id, updateAuthorDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.authorModel.findByIdAndDelete(id).exec();
  }
}
