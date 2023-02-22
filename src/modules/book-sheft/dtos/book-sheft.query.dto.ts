import { ApiProperty } from '@nestjs/swagger';

export class QueryBookSheftDto {
  @ApiProperty({ required: false, default: 10 })
  limit?: number;

  @ApiProperty({ required: false, default: 1 })
  page?: number;

  @ApiProperty({ required: false })
  searchKey?: string;
}
