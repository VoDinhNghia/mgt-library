import { ApiProperty } from '@nestjs/swagger';
import { QueryPagination } from 'src/utils/page.pagination.query.dto';

export class QueryBookDto extends QueryPagination {
  @ApiProperty({ required: false, default: '23-02-2023' })
  publishYear?: string;
}
