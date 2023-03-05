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
import { ResponseRequest } from 'src/utils/responseApi';
import { ErolesUser } from 'src/constants/constant';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role-auth.guard';
import { BookCategoriesService } from './book-categories.service';
import { Response } from 'express';
import { CreateBookCategoryDto } from './dtos/book-categories.create.dto';
import { QueryBookCategoryDto } from './dtos/book-categories.query.dto';
import { UpdateBookCategoryDto } from './dtos/book-categories.update.dto';

@Controller('api/book-categories')
@ApiTags('book-categories')
export class BookCategoriesController {
  constructor(private readonly bookCategoryService: BookCategoriesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.ADMIN]))
  async createBookCategory(
    @Body() createBookCategoryDto: CreateBookCategoryDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.bookCategoryService.createBookCategory(
      createBookCategoryDto,
    );
    return new ResponseRequest(res, result, 'Create book category success');
  }

  @Get('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(
    RoleGuard([
      ErolesUser.ADMIN,
      ErolesUser.LIBRARIAN,
      ErolesUser.LECTURER,
      ErolesUser.STUDENT,
    ]),
  )
  async getBookCategoryById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.bookCategoryService.findBookCategoryById(id);
    return new ResponseRequest(res, result, 'Get book category by id success.');
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(
    RoleGuard([
      ErolesUser.ADMIN,
      ErolesUser.LIBRARIAN,
      ErolesUser.LECTURER,
      ErolesUser.STUDENT,
    ]),
  )
  async getAllBookCategory(
    @Query() queryBookCategoryDto: QueryBookCategoryDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.bookCategoryService.findAllBookCategories(
      queryBookCategoryDto,
    );
    return new ResponseRequest(res, result, 'Get all book category success.');
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.ADMIN]))
  async updateBookCategory(
    @Param('id') id: string,
    @Body() updateBookCategorytDto: UpdateBookCategoryDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.bookCategoryService.updateBookCategory(
      id,
      updateBookCategorytDto,
    );
    return new ResponseRequest(res, result, 'Update book category success.');
  }
}
