import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidateField } from 'src/abstracts/validateFieldById';
import { DbConnection } from 'src/commons/dBConnection';
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
  providers: [BookSheftService, ValidateField, DbConnection],
})
export class BookSheftModule {}
