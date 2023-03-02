import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonException } from 'src/exceptions/execeptionError';
import { CreateLibraryDto } from './dtos/libraries.create.dto';
import { UpdateLibraryDto } from './dtos/libraries.update.dto';
import { Libraries, LibrariesDocument } from './schemas/libraries.schema';
import { numberIdLibrary } from 'src/constants/constant';

@Injectable()
export class LibrariesService {
  constructor(
    @InjectModel(Libraries.name)
    private readonly librarySchema: Model<LibrariesDocument>,
  ) {}

  async initLibrary(createLibraryDto: CreateLibraryDto): Promise<void> {
    const existed = await this.librarySchema.findOne({
      numberId: numberIdLibrary,
    });
    if (!existed) {
      await new this.librarySchema(createLibraryDto).save();
    }
  }

  async updateLibrary(
    id: string,
    updateLibraryDto: UpdateLibraryDto,
  ): Promise<Libraries> {
    await this.librarySchema.findByIdAndUpdate(id, updateLibraryDto);
    const result = await this.librarySchema.findById(id);
    if (!result) {
      new CommonException(404, `Library not found.`);
    }
    return result;
  }

  async getLibraryInfo(): Promise<Libraries> {
    const result = await this.librarySchema.aggregate([
      {
        $lookup: {
          from: 'profiles',
          localField: 'librarian',
          foreignField: '_id',
          as: 'librarian',
        },
      },
      { $unwind: '$librarian' },
    ]);
    return result[0] ?? {};
  }
}
