import { Module } from '@nestjs/common';
import { LibraryServiceController } from './library-service.controller';
import { LibraryServiceService } from './library-service.service';

@Module({
  controllers: [LibraryServiceController],
  providers: [LibraryServiceService],
})
export class LibraryServiceModule {}
