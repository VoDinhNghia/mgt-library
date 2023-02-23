import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommonException } from 'src/abstracts/execeptionError';
import { Pagination } from 'src/abstracts/pagePagination';
import {
  BookCategory,
  BookCategoryDocument,
} from '../book-categories/schemas/category-book.schema';
import { CreateBookDto } from './dtos/books.create.dto';
import { QueryBookDto } from './dtos/books.query.dto';
import { UpdateBookDto } from './dtos/books.update.dto';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookSchema: Model<BookDocument>,
    @InjectModel(BookCategory.name)
    private readonly bookCategorySchema: Model<BookCategoryDocument>,
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

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    await this.bookSchema.findByIdAndUpdate(id, updateBookDto);
    const result = await this.findBookById(id);
    return result;
  }

  async findAllBooks(queryDto: QueryBookDto): Promise<Book[]> {
    const { limit, page, searchKey } = queryDto;
    const match: Record<string, any> = { $match: {} };
    let aggregate: any[] = [];
    if (searchKey) {
      match.$match.$or = [
        {
          name: new RegExp(searchKey),
        },
      ];
    }
    const lookup = [
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
    ];
    aggregate = [...aggregate, match, ...lookup];
    const aggregatePagi: any = new Pagination(limit, page, aggregate);

    const result = await this.bookCategorySchema.aggregate(aggregatePagi);
    return result;
  }
}
