import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from '../users/schemas/users.profile.schema';
import { LibrariesController } from './libraries.controller';
import { LibrariesService } from './libraries.service';
import { Libraries, LibrariesSchema } from './schemas/libraries.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Libraries.name, schema: LibrariesSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
  ],
  controllers: [LibrariesController],
  providers: [LibrariesService],
})
export class LibrariesModule {}
