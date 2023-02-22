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
import { BookSheftService } from './book-sheft.service';
import { CreateBookSheftDto } from './dtos/book-sheft.create.dto';
import { Response } from 'express';
import { QueryBookSheftDto } from './dtos/book-sheft.query.dto';
import { UpdateBookSheftDto } from './dtos/book-sheft.update.dto';

@Controller('book-shefts')
@ApiTags('book-shefts')
export class BookSheftController {
  constructor(private readonly bookSheftService: BookSheftService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.LIBRARIAN))
  async createBookSheft(
    @Body() createBookSheftDto: CreateBookSheftDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.bookSheftService.createBookSheft(
      createBookSheftDto,
    );
    return new ResponseRequest(res, result, 'Create book sheft success');
  }

  @Get('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.LIBRARIAN))
  async getBookSheftById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.bookSheftService.getById(id);
    return new ResponseRequest(res, result, 'Get book sheft by id success.');
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.LIBRARIAN))
  async getAllBookSheft(
    @Query() queryBookSheftDto: QueryBookSheftDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.bookSheftService.findAllBookSheft(
      queryBookSheftDto,
    );
    return new ResponseRequest(res, result, 'Get all book sheft success.');
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(roleTypeAccessApi.LIBRARIAN))
  async updateBookSheft(
    @Param('id') id: string,
    @Body() updateBookSheftDto: UpdateBookSheftDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.bookSheftService.updateBookSheft(
      id,
      updateBookSheftDto,
    );
    return new ResponseRequest(res, result, 'Update book sheft success.');
  }
}
