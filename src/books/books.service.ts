import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDocument } from './interfaces/book.interface';
import { Book } from './schemas/books.schemas';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private readonly bookModel: Model<Book>) { }

  async create(createBookDto: CreateBookDto): Promise<BookDocument> {
    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }

  async findAll(): Promise<BookDocument[]> {
    return this.bookModel.find().populate('author language semester courses').exec();
  }

  async findOne(id: string) {
    return this.bookModel.findById(id).populate('author language semester courses').exec();
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.bookModel.findByIdAndDelete(id).exec();
  }
}

