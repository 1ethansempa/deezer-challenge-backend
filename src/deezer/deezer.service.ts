import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';
import {
  TrackDto,
  ArtistDto,
  TrackWithContributorsDto,
  AlbumDto,
} from './dtos/deezer.dto';
import { logger } from 'firebase-functions';

@Injectable()
export class DeezerService {
  /**
   * The function `getResultsByQuery` is an asynchronous function that takes a query string as input and
   * returns a promise that resolves to an array of `TrackDto` objects.
   * @param {string} query - The `query` parameter is a string that represents the search query for
   * tracks. It is used to search for tracks in the Deezers API.
   * @returns a Promise that resolves to an array of TrackDto objects.
   */
  async getResultsByQuery(query: string): Promise<TrackDto[]> {
    try {
      const response = await axios.get(
        `${process.env.DEEZER_API}/search?q=${query}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const results = response.data.data.map((result: any) => {
          return new TrackDto(result);
        });

        if (results.length === 0)
          throw new NotFoundException('No Results Found');

        return results;
      }

      throw new InternalServerErrorException(
        'Something went wrong at the server'
      );
    } catch (error: any) {
      logger.error(error.message);

      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * The function `getArtist` makes an asynchronous HTTP GET request to the Deezzer API to retrieve
   * information about an artist, and returns a promise that resolves to an `ArtistDto` object.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of an
   * artist. It is used to fetch the details of the artist from the Deezzer API.
   * @returns The `getArtist` function returns a Promise that resolves to an `ArtistDto` object.
   */
  async getArtist(id: number): Promise<ArtistDto> {
    try {
      const response = await axios.get(
        `${process.env.DEEZER_API}/artist/${id}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data) {
        const result = response.data;

        return new ArtistDto(result);
      }

      throw new InternalServerErrorException(
        'Something went wrong at the server'
      );
    } catch (error: any) {
      logger.error(error.message);

      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * The function `getArtistTopTracks` retrieves the top tracks of an artist from the Deezer API and
   * returns them as an array of `TrackWithContributorsDto` objects.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of an
   * artist. It is used to fetch the top tracks of the artist from the Deezers API.
   * @returns The function `getArtistTopTracks` returns a promise that resolves to an array of
   * `TrackWithContributorsDto` objects.
   */
  async getArtistTopTracks(id: number): Promise<TrackWithContributorsDto[]> {
    try {
      const response = await axios.get(
        `${process.env.DEEZER_API}/artist/${id}/top?limit=5`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data) {
        const results = response.data.data.map((result) => {
          return new TrackWithContributorsDto(result);
        });

        return results;
      }
    } catch (error: any) {
      logger.error(error.message);

      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * The function `getArtistAlbums` is an asynchronous function that retrieves albums by artist ID from
   * the Deezer API and returns an array of `AlbumDto` objects.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of an
   * artist. It is used to fetch the albums associated with that artist from the Deezzer API.
   * @returns a Promise that resolves to an array of AlbumDto objects.
   */
  async getArtistAlbums(id: number): Promise<AlbumDto[]> {
    try {
      const response = await axios.get(
        `${process.env.DEEZER_API}/artist/${id}/albums`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data) {
        const results = response.data.data.map((result) => {
          return new AlbumDto(result);
        });

        return results;
      }
    } catch (error: any) {
      logger.error(error.message);
    }
  }
}
