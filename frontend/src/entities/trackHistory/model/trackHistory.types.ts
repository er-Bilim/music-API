import type { IArtistShow } from '../../artist/model/artist.types';
import type { ITrack } from '../../track/model/track.types';

export interface ITrackHistory {
  _id: string;
  artist: IArtistShow;
  track: ITrack;
  datetime: string;
}

export interface ITrackHistoryMutation {
  artist: string;
  track: string;
}
