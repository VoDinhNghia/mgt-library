import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseRequest } from 'src/abstracts/responseApi';
import { roleTypeAccessApi } from 'src/commons/constants';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role-auth.guard';
import { BookSheftService } from './book-sheft.service';
import { CreateBookSheftDto } from './dtos/book-sheft.create.dto';
import { Response } from 'express';

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
}
