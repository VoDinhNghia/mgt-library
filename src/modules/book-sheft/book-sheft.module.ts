import { Module } from '@nestjs/common';
import { BookSheftController } from './book-sheft.controller';
import { BookSheftService } from './book-sheft.service';

@Module({
  controllers: [BookSheftController],
  providers: [BookSheftService],
})
export class BookSheftModule {}
