import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseRequest } from 'src/abstracts/responseApi';
import { roleTypeAccessApi } from 'src/commons/constants';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role-auth.guard';
import { BooksService } from './books.service';
import { Response } from 'express';
import { CreateBookDto } from './dtos/books.create.dto';
import { QueryBookDto } from './dtos/books.query.dto';
import { UpdateBookDto } from './dtos/books.update.dto';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.LIBRARIAN))
  async createBook(
    @Body() createBookDto: CreateBookDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.bookService.createBook(createBookDto);
    return new ResponseRequest(res, result, 'Create book success');
  }

  @Get('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.FULL))
  async getBookById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.bookService.findBookById(id);
    return new ResponseRequest(res, result, 'Get book by id success.');
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.FULL))
  async getAllBooks(
    @Query() queryBookDto: QueryBookDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.bookService.findAllBooks(queryBookDto);
    return new ResponseRequest(res, result, 'Get all books success.');
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.LIBRARIAN))
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.bookService.updateBook(id, updateBookDto);
    return new ResponseRequest(res, result, 'Update book success.');
  }
}
