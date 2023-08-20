import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { DeezerService } from './deezer.service';
import {
  ArtistDto,
  TrackDto,
  TrackWithContributorsDto,
} from './dtos/deezer.dto';

@Controller('deezer')
export class DeezerController {
  constructor(private readonly deezerService: DeezerService) {}

  @Get('/search')
  async search(@Query('q') query?: string): Promise<TrackDto[]> {
    console.log(query);

    return await this.deezerService.getResultsByQuery(query);
  }

  @Get('/artist/:id')
  async getArtist(
    @Param('id', new ParseIntPipe()) id: number
  ): Promise<ArtistDto> {
    return await this.deezerService.getArtist(id);
  }

  async getArtistTopTracks(
    @Param('id', new ParseIntPipe()) id: number
  ): Promise<TrackWithContributorsDto[]> {
    return await this.deezerService.getArtistTopTracks(id);
  }
}
