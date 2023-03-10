import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongoUrl } from './configs/config';
import { AuthModule } from './modules/auth/auth.module';
import { BookCategoriesModule } from './modules/book-categories/book-categories.module';
import { BookSheftModule } from './modules/book-sheft/book-sheft.module';
import { BooksModule } from './modules/books/books.module';
import { LibrariesModule } from './modules/libraries/libraries.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'src/public'),
    }),
    UsersModule,
    AuthModule,
    LibrariesModule,
    BookSheftModule,
    BookCategoriesModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
