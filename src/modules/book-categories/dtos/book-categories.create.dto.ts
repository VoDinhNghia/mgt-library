import { ApiProperty } from '@nestjs/swagger';

export class CreateBookCategoryDto {
  @ApiProperty({ required: true })
  name?: string;

  @ApiProperty({ required: true })
  booksheft?: string;

  @ApiProperty({ required: true, default: 1000 })
  amount?: number;

  @ApiProperty({ required: false })
  description?: string;
}
