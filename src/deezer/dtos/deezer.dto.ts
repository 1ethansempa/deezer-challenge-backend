import { IsNumber, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class Artist {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  picture: string;

  @IsString()
  @IsNotEmpty()
  picture_small: string;

  @IsString()
  @IsNotEmpty()
  picture_medium: string;

  @IsString()
  @IsNotEmpty()
  picture_big: string;

  @IsString()
  @IsNotEmpty()
  picture_xl: string;

  @IsString()
  @IsNotEmpty()
  tracklist: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

class Album {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  cover: string;

  @IsString()
  @IsNotEmpty()
  cover_small: string;

  @IsString()
  @IsNotEmpty()
  cover_medium: string;

  @IsString()
  @IsNotEmpty()
  cover_big: string;

  @IsString()
  @IsNotEmpty()
  cover_xl: string;

  @IsString()
  @IsNotEmpty()
  tracklist: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export class TrackDto {
  @IsNumber()
  id: number;

  @IsBoolean()
  readable: boolean;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  title_short: string;

  @IsString()
  title_version: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  rank: number;

  @IsBoolean()
  explicit_lyrics: boolean;

  @IsNumber()
  explicit_content_lyrics: number;

  @IsNumber()
  explicit_content_cover: number;

  @IsString()
  @IsNotEmpty()
  preview: string;

  @IsString()
  @IsNotEmpty()
  md5_image: string;

  @Type(() => Artist)
  artist: Artist;

  @Type(() => Album)
  album: Album;

  @IsString()
  type: string;

  constructor(partial: Partial<TrackDto>) {
    Object.assign(this, partial);
  }
}
