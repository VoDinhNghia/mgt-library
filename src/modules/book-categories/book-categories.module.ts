import { Module } from '@nestjs/common';
import { BookCategoriesController } from './book-categories.controller';
import { BookCategoriesService } from './book-categories.service';

@Module({
  controllers: [BookCategoriesController],
  providers: [BookCategoriesService],
})
export class BookCategoriesModule {}
