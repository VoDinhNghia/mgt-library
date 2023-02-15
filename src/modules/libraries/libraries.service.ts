import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Libraries, LibrariesDocument } from './schemas/libraries.schema';

@Injectable()
export class LibrariesService {
  constructor(
    @InjectModel(Libraries.name)
    private readonly librarySchema: Model<LibrariesDocument>,
  ) {}
  // should create module for schema appoiment, book-sheft, book, ...
}
