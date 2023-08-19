import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';
import { TrackDto } from './dtos/deezer.dto';

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
      console.log(`${process.env.DEEZER_API}/search?q=${query}`);

      const response = await axios.get(
        `${process.env.DEEZER_API}/search?q=${query}`
      );

      if (response.status === 200) {
        console.log(response.data);

        const results = response.data.data.map((result: any) => {
          return new TrackDto(result);
        });

        return results;
      }

      throw new NotFoundException('Error fetching results');
    } catch (error: any) {
      console.error(error.message);

      throw new InternalServerErrorException(error.message);
    }
  }
}
