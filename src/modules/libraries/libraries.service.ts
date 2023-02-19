import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonException } from 'src/abstracts/execeptionError';
import {
  Profile,
  ProfileDocument,
} from '../users/schemas/users.profile.schema';
import { CreateLibraryDto } from './dtos/libraries.create.dto';
import { UpdateLibraryDto } from './dtos/libraries.update.dto';
import { Libraries, LibrariesDocument } from './schemas/libraries.schema';
import { numberIdLibrary } from 'src/commons/constants';

@Injectable()
export class LibrariesService {
  constructor(
    @InjectModel(Libraries.name)
    private readonly librarySchema: Model<LibrariesDocument>,
    @InjectModel(Profile.name)
    private readonly profileSchema: Model<ProfileDocument>,
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
    const result = await this.librarySchema
      .find({})
      .populate('librarian', '', this.profileSchema)
      .exec();
    return result[0] ?? {};
  }
}
