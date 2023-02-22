import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookCategoryDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  booksheft?: string;

  @ApiProperty({ required: false, default: 1000 })
  amount?: number;

  @ApiProperty({ required: false })
  description?: string;
}
