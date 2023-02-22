import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BookSheft,
  BookSheftSchema,
} from '../book-sheft/schemas/book-sheft.schema';
import { BookCategoriesController } from './book-categories.controller';
import { BookCategoriesService } from './book-categories.service';
import {
  BookCategory,
  BookCategorySchema,
} from './schemas/category-book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
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
  controllers: [BookCategoriesController],
  providers: [BookCategoriesService],
})
export class BookCategoriesModule {}
