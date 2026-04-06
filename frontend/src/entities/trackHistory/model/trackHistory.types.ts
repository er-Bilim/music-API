import type { IArtistShow } from '../../artist/model/artist.types';
import type { ITrack } from '../../track/model/track.types';

export interface ITrackHistory {
  _id: string;
  artist: IArtistShow;
  track: ITrack;
  created_at: string;
}
