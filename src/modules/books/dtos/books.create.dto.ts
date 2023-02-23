import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ required: true })
  name?: string;

  @ApiProperty({ required: true })
  bookCategory?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: true })
  author?: string;

  @ApiProperty({ required: true, default: '23-02-2023' })
  publishYear?: string;

  @ApiProperty({ required: true, default: 100 })
  amount?: number;

  @ApiProperty({ required: false, default: 0 })
  loanAmount?: number;
}
