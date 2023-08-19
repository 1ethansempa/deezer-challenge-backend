import { Controller, Get, Query } from '@nestjs/common';
import { DeezerService } from './deezer.service';

@Controller('api/deezer')
export class DeezerController {
  constructor(private readonly deezerService: DeezerService) {}

  @Get('/search')
  async search(@Query('q') query?: string) {
    console.log(query);

    return await this.deezerService.getResultsByQuery(query);
  }
}
