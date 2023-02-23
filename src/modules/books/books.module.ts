import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BookCategory,
  BookCategorySchema,
} from '../book-categories/schemas/category-book.schema';
import {
  BookSheft,
  BookSheftSchema,
} from '../book-sheft/schemas/book-sheft.schema';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book, BookSchema } from './schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
      {
        name: BookCategory.name,
        schema: BookCategorySchema,
      },
      {
        name: BookSheft.name,
        schema: BookSheftSchema,
      },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
