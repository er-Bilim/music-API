export interface IArtist {
  _id: string;
  name: string;
  image: string;
  information: string;
  isPublished: boolean;
}

export interface IArtistShow {
  name: string;
  image: string;
  information: string;
}

export interface IArtistMutation {
  name: string;
  image: File | null;
  information: string;
}

export interface IArtistCreated {
  message: string;
  artist: IArtist;
}
