import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommonException } from 'src/abstracts/execeptionError';
import {
  BookCategory,
  BookCategoryDocument,
} from '../book-categories/schemas/category-book.schema';
import {
  BookSheft,
  BookSheftDocument,
} from '../book-sheft/schemas/book-sheft.schema';
import { CreateBookDto } from './dtos/books.create.dto';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookSchema: Model<BookDocument>,
    @InjectModel(BookCategory.name)
    private readonly bookCategorySchema: Model<BookCategoryDocument>,
    @InjectModel(BookSheft.name)
    private readonly bookSheftSchema: Model<BookSheftDocument>,
  ) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const bookCategory = await this.bookCategorySchema.findById(
      createBookDto.bookCategory,
    );
    if (!bookCategory) {
      new CommonException(404, 'Book category not found.');
    }
    const book = await new this.bookSchema(createBookDto).save();
    const result = await this.findBookById(book._id);
    return result;
  }

  async findBookById(id: string): Promise<Book> {
    const result = await this.bookSchema.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'bookcategories',
          localField: 'bookCategory',
          foreignField: '_id',
          as: 'bookCategory',
        },
      },
      { $unwind: '$bookCategory' },
      {
        $lookup: {
          from: 'bookshefts',
          localField: 'bookCategory.booksheft',
          foreignField: '_id',
          as: 'booksheft',
        },
      },
      { $unwind: '$booksheft' },
    ]);
    if (!result[0]) {
      new CommonException(404, 'Book not found.');
    }
    return result[0];
  }
}
