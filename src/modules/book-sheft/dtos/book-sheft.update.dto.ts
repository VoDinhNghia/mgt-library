import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookSheftDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  room?: string;

  @ApiProperty({ required: false })
  description?: string;
}
