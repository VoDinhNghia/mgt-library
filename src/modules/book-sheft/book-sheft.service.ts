import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommonException } from 'src/abstracts/execeptionError';
import { ValidateField } from 'src/abstracts/validateFieldById';
import { DbConnection } from 'src/commons/dBConnection';
import { CreateBookSheftDto } from './dtos/book-sheft.create.dto';
import { BookSheft, BookSheftDocument } from './schemas/book-sheft.schema';

@Injectable()
export class BookSheftService {
  constructor(
    @InjectModel(BookSheft.name)
    private readonly bookSheftSchema: Model<BookSheftDocument>,
    private readonly validate: ValidateField,
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
}
