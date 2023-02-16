import { Module } from '@nestjs/common';
import { MgtComputerController } from './mgt-computer.controller';
import { MgtComputerService } from './mgt-computer.service';

@Module({
  controllers: [MgtComputerController],
  providers: [MgtComputerService]
})
export class MgtComputerModule {}
