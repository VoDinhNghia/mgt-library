import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommonException } from 'src/abstracts/execeptionError';
import { Pagination } from 'src/abstracts/pagePagination';
import { DbConnection } from 'src/commons/dBConnection';
import { CreateBookSheftDto } from './dtos/book-sheft.create.dto';
import { QueryBookSheftDto } from './dtos/book-sheft.query.dto';
import { UpdateBookSheftDto } from './dtos/book-sheft.update.dto';
import { BookSheft, BookSheftDocument } from './schemas/book-sheft.schema';

@Injectable()
export class BookSheftService {
  constructor(
    @InjectModel(BookSheft.name)
    private readonly bookSheftSchema: Model<BookSheftDocument>,
    private readonly db: DbConnection,
  ) {}

  async createBookSheft(
    createBookSheftDto: CreateBookSheftDto,
  ): Promise<BookSheft> {
    const room = await this.db
      .collection('rooms')
      .findOne({ _id: new Types.ObjectId(createBookSheftDto.room) });
    if (!room) {
      new CommonException(404, 'Room not found.');
    }
    const bookSheft = await new this.bookSheftSchema(createBookSheftDto).save();
    const result = await this.getById(bookSheft._id);
    return result;
  }

  async getById(id: string): Promise<BookSheft> {
    const result = await this.bookSheftSchema.aggregate([
      {
        $match: { _id: new Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'rooms',
          localField: 'room',
          foreignField: '_id',
          as: 'room',
        },
      },
      { $unwind: '$room' },
    ]);
    if (!result[0]) {
      new CommonException(404, 'Book sheft not found.');
    }
    return result[0];
  }

  async updateBookSheft(
    id: string,
    updateBookSheftDto: UpdateBookSheftDto,
  ): Promise<BookSheft> {
    await this.bookSheftSchema.findByIdAndUpdate(id, updateBookSheftDto);
    const bookSheft = await this.getById(id);
    return bookSheft;
  }

  async findAllBookSheft(
    queryBookSheftDto: QueryBookSheftDto,
  ): Promise<BookSheft[]> {
    const { limit, page, searchKey } = queryBookSheftDto;
    const match: Record<string, any> = { $match: {} };
    let aggregate: any[] = [];
    const lookup = {
      $lookup: {
        from: 'rooms',
        localField: 'room',
        foreignField: '_id',
        as: 'room',
      },
    };
    if (searchKey) {
      match.$match.$or = [
        {
          name: new RegExp(searchKey),
        },
      ];
    }

    aggregate = [...aggregate, match, lookup, { $unwind: '$room' }];
    const aggregatePagination: any = new Pagination(limit, page, aggregate);

    const result = await this.bookSheftSchema.aggregate(aggregatePagination);
    return result;
  }
}
