export interface IArtist {
  name: string;
  image: string | null;
  information: string | null;
}

export interface IAlbum {
  artist_id: string;
  name: string;
  release_year: string;
  album_cover: string | null;
}

export interface Track {
  album_id: string;
  name: string;
  time: string;
}
