import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LibrariesController } from './libraries.controller';
import { LibrariesService } from './libraries.service';
import { Libraries, LibrariesSchema } from './schemas/libraries.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Libraries.name, schema: LibrariesSchema },
    ]),
  ],
  controllers: [LibrariesController],
  providers: [LibrariesService],
})
export class LibrariesModule {}
