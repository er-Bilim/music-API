export interface ITrack {
  _id: string;
  album_id: string;
  name: string;
  time: string;
  trackNumber: number;
  youtubeLink: string | null;
  isPublished: boolean;
}

export interface ITrackMutation {
  album_id: string;
  name: string;
  time: string;
  youtubeLink?: string | null;
}

export interface ICreatedTrack {
  message: string;
  track: ITrack;
}
