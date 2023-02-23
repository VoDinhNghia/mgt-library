import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  bookCategory?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  author?: string;

  @ApiProperty({ required: false, default: '23-02-2023' })
  publishYear?: string;

  @ApiProperty({ required: false, default: 100 })
  amount?: number;

  @ApiProperty({ required: false, default: 0 })
  loanAmount?: number;
}
