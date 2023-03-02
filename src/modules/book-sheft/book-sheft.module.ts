import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbConnection } from 'src/constants/dBConnection';
import { BookSheftController } from './book-sheft.controller';
import { BookSheftService } from './book-sheft.service';
import { BookSheft, BookSheftSchema } from './schemas/book-sheft.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BookSheft.name,
        schema: BookSheftSchema,
      },
    ]),
  ],
  controllers: [BookSheftController],
  providers: [BookSheftService, DbConnection],
})
export class BookSheftModule {}
