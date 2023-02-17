import { ApiProperty } from '@nestjs/swagger';

export class CreateLibraryDto {
  @ApiProperty({ required: true })
  name?: string;

  @ApiProperty({ required: true, default: '2023-02-17' })
  foundYear?: string;
}
