import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';
import {
  TrackDto,
  TrackWithContributorsDto,
  ExtendedArtistDto,
  ExtendedAlbumDto,
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
   * The function `getArtist` makes an API call to retrieve information about an artist and returns an
   * instance of the `ExtendedArtistDto` class.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of an
   * artist. It is used to fetch the details of the artist from the Deezzer API.
   * @returns The function `getArtist` returns a Promise that resolves to an instance of the
   * `ExtendedArtistDto` class.
   */
  async getArtist(id: number): Promise<ExtendedArtistDto> {
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

        return new ExtendedArtistDto(result);
      }

      throw new InternalServerErrorException(
        'Something went wrong when fetching this'
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
   * The function `getArtistAlbums` makes an API call to retrieve albums by a given artist ID and
   * returns an array of `ExtendedAlbumDto` objects.
   * @param {number} id - The `id` parameter is the unique identifier of an artist. It is used to fetch
   * the albums of the artist with the specified ID.
   * @returns a Promise that resolves to an array of ExtendedAlbumDto objects.
   */
  async getArtistAlbums(id: number): Promise<ExtendedAlbumDto[]> {
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
          return new ExtendedAlbumDto(result);
        });

        return results;
      }
    } catch (error: any) {
      logger.error(error.message);
    }
  }
}
