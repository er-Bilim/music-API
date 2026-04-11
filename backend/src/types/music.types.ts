export interface IArtist {
  name: string;
  image: string | null;
  information: string | null;
}

export interface IAlbum {
  artist_id: string;
  name: string;
  image: string | null;
  release_year: number;
}

export interface ITrack {
  album_id: string;
  name: string;
  time: string;
  youtubeLink: string | null;
}

export interface ITrackHistory {
  track: string;
  artist: string;
}
