import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonException } from 'src/abstracts/execeptionError';
import { CreateLibraryDto } from './dtos/libraries.create.dto';
import { UpdateLibraryDto } from './dtos/libraries.update.dto';
import { Libraries, LibrariesDocument } from './schemas/libraries.schema';

@Injectable()
export class LibrariesService {
  constructor(
    @InjectModel(Libraries.name)
    private readonly librarySchema: Model<LibrariesDocument>,
  ) {}

  async initLibrary(createLibraryDto: CreateLibraryDto): Promise<void> {
    const existed = await this.librarySchema.findOne({
      name: createLibraryDto.name,
    });
    if (!existed) {
      await new this.librarySchema(createLibraryDto).save();
    }
  }

  async updateLibrary(
    id: string,
    updateLibraryDto: UpdateLibraryDto,
  ): Promise<void> {
    const existed = await this.librarySchema.findById(id);
    if (!existed) {
      new CommonException(404, `Library not found.`);
    }
    await this.librarySchema.findByIdAndUpdate(id, updateLibraryDto);
  }

  async getLibraryInfo(): Promise<Libraries> {
    const result = await this.librarySchema.find({});
    return result[0] ?? {};
  }
}
