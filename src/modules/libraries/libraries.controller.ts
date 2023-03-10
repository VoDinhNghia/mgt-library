import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseRequest } from 'src/utils/response-api';
import { ErolesUser } from 'src/constants/constant';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role-auth.guard';
import { CreateLibraryDto } from './dtos/libraries.create.dto';
import { UpdateLibraryDto } from './dtos/libraries.update.dto';
import { LibrariesService } from './libraries.service';
import { Response } from 'express';

@Controller('api/libraries')
@ApiTags('libraries')
export class LibrariesController {
  constructor(private readonly libraryService: LibrariesService) {
    const createLibraryDto: CreateLibraryDto = {
      name: 'Thư viện trường Đại Học Công Nghiệp TP. HCM',
      foundYear: '2023-02-17',
    };
    this.libraryService.initLibrary(createLibraryDto);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.ADMIN]))
  async updateLibrary(
    @Body() updateLibraryDto: UpdateLibraryDto,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.libraryService.updateLibrary(
      id,
      updateLibraryDto,
    );
    return new ResponseRequest(res, result, 'Update library success');
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(
    RoleGuard([
      ErolesUser.LIBRARIAN,
      ErolesUser.ADMIN,
      ErolesUser.LECTURER,
      ErolesUser.STUDENT,
    ]),
  )
  async getLibraryInfo(@Res() res: Response): Promise<ResponseRequest> {
    const result = await this.libraryService.getLibraryInfo();
    return new ResponseRequest(res, result, 'Get library info success.');
  }
}
