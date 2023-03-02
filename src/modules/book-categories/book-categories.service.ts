import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonException } from 'src/exceptions/execeptionError';
import { Pagination } from 'src/utils/pagePagination';
import {
  BookSheft,
  BookSheftDocument,
} from '../book-sheft/schemas/book-sheft.schema';
import { CreateBookCategoryDto } from './dtos/book-categories.create.dto';
import { QueryBookCategoryDto } from './dtos/book-categories.query.dto';
import { UpdateBookCategoryDto } from './dtos/book-categories.update.dto';
import {
  BookCategory,
  BookCategoryDocument,
} from './schemas/category-book.schema';

@Injectable()
export class BookCategoriesService {
  constructor(
    @InjectModel(BookCategory.name)
    private readonly bookCategorySchema: Model<BookCategoryDocument>,
    @InjectModel(BookSheft.name)
    private readonly bookSheftSchema: Model<BookSheftDocument>,
  ) {}

  async createBookCategory(
    createBookCategory: CreateBookCategoryDto,
  ): Promise<BookCategory> {
    const bookSheft = await this.bookSheftSchema.findById(
      createBookCategory.booksheft,
    );
    if (!bookSheft) {
      new CommonException(404, 'Book sheft not found.');
    }
    const bookCategory = await new this.bookCategorySchema(
      createBookCategory,
    ).save();
    const result = await this.findBookCategoryById(bookCategory._id);
    return result;
  }

  async findBookCategoryById(id: string): Promise<BookCategory> {
    const result = await this.bookCategorySchema
      .findById(id)
      .populate('booksheft', '', this.bookSheftSchema)
      .exec();
    if (!result) {
      new CommonException(404, 'Book category not found.');
    }
    return result;
  }

  async updateBookCategory(
    id: string,
    updateBookCategoryDto: UpdateBookCategoryDto,
  ): Promise<BookCategory> {
    await this.bookCategorySchema.findByIdAndUpdate(id, updateBookCategoryDto);
    const result = await this.findBookCategoryById(id);
    return result;
  }

  async findAllBookCategories(
    queryDto: QueryBookCategoryDto,
  ): Promise<BookCategory[]> {
    const { limit, page, searchKey } = queryDto;
    const match: Record<string, any> = { $match: {} };
    let aggregate: any[] = [];
    const lookup = {
      $lookup: {
        from: 'bookshefts',
        localField: 'booksheft',
        foreignField: '_id',
        as: 'booksheft',
      },
    };
    if (searchKey) {
      match.$match.$or = [
        {
          name: new RegExp(searchKey),
        },
      ];
    }

    aggregate = [...aggregate, match, lookup, { $unwind: '$booksheft' }];
    const aggregatePagi: any = new Pagination(limit, page, aggregate);

    const result = await this.bookCategorySchema.aggregate(aggregatePagi);
    return result;
  }
}
