import { IsNumber, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Type, Exclude } from 'class-transformer';

export class ArtistDto {
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
  @Exclude()
  picture_small: string;

  @IsString()
  @IsNotEmpty()
  @Exclude()
  picture_medium: string;

  @IsString()
  @IsNotEmpty()
  picture_big: string;

  @IsString()
  @IsNotEmpty()
  @Exclude()
  picture_xl: string;

  @IsString()
  @IsNotEmpty()
  tracklist: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  constructor(partial: Partial<ArtistDto>) {
    Object.assign(this, partial);
  }
}

export class AlbumDto {
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
  @Exclude()
  cover_small: string;

  @IsString()
  @IsNotEmpty()
  @Exclude()
  cover_medium: string;

  @IsString()
  @IsNotEmpty()
  cover_big: string;

  @IsString()
  @IsNotEmpty()
  @Exclude()
  cover_xl: string;

  @IsString()
  @IsNotEmpty()
  tracklist: string;

  @IsString()
  @IsNotEmpty()
  @Exclude()
  type: string;

  constructor(partial: Partial<AlbumDto>) {
    Object.assign(this, partial);
  }
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
  @Exclude()
  title_short: string;

  @IsString()
  @Exclude()
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
  @Exclude()
  explicit_content_lyrics: number;

  @IsNumber()
  @Exclude()
  explicit_content_cover: number;

  @IsString()
  @IsNotEmpty()
  @Exclude()
  preview: string;

  @IsString()
  @IsNotEmpty()
  @Exclude()
  md5_image: string;

  @Type(() => ArtistDto)
  artist: ArtistDto;

  @Type(() => AlbumDto)
  album: AlbumDto;

  @IsString()
  type: string;

  constructor(partial: Partial<TrackDto>) {
    Object.assign(this, partial);
  }
}

class Contributor {
  @IsNumber()
  id: number;

  @IsString()
  link: string;

  @IsString()
  share: string;

  @IsString()
  picture: string;

  @IsString()
  @Exclude()
  picture_small: string;

  @IsString()
  @Exclude()
  picture_medium: string;

  @IsString()
  @Exclude()
  picture_big: string;

  @IsString()
  @Exclude()
  picture_xl: string;

  @IsBoolean()
  @Exclude()
  radio: boolean;

  @IsString()
  tracklist: string;

  @IsString()
  @Exclude()
  type: string;

  @IsString()
  @Exclude()
  role: string;
}

export class TrackWithContributorsDto extends TrackDto {
  @Type(() => Contributor)
  contributors: Contributor[];

  constructor(partial: Partial<TrackWithContributorsDto>) {
    super(partial);
  }
}
