export interface IArtist {
  name: string;
  image: string | null;
  information: string | null;
}

export interface IAlbum {
  artist_id: string;
  name: string;
  image: string | null;
}

export interface ITrack {
  album_id: string;
  name: string;
  time: string;
}
