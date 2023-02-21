import { ApiProperty } from '@nestjs/swagger';

export class CreateBookSheftDto {
  @ApiProperty({ required: true })
  name?: string;

  @ApiProperty({ required: true })
  room?: string;

  @ApiProperty({ required: true })
  description?: string;
}
