import { Module } from '@nestjs/common';
import { DeezerController } from './deezer.controller';
import { DeezerService } from './deezer.service';

@Module({
  controllers: [DeezerController],
  providers: [DeezerService],
})
export class DeezerModule {}
