import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './schemas/language.schema';

@Injectable()
export class LanguagesService {
  constructor(@InjectModel(Language.name) private readonly languageModel: Model<Language>) { }

  async create(createLanguageDto: CreateLanguageDto): Promise<Language> {
    const newLanguage = new this.languageModel(createLanguageDto);
    return newLanguage.save();
  }

  async findAll(): Promise<Language[]> {
    return this.languageModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    return this.languageModel.findById(id).exec();
  }

  async update(id: string, updateLanguageDto: UpdateLanguageDto): Promise<any> {
    return this.languageModel.findByIdAndUpdate(id, updateLanguageDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.languageModel.findByIdAndDelete(id).exec();
  }
}
