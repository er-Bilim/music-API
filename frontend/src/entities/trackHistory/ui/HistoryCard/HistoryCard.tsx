import type { FC } from 'react';
import type { ITrackHistory } from '../../model/trackHistory.types';
import classes from './HistoryCard.module.css';
import ArtistAvatar from '../../../artist/ui/ArtistAvatar/ArtistAvatar';
import ArtistName from '../../../artist/ui/ArtistName/ArtistName';
import TrackName from '../../../track/ui/TrackName/TrackName';
import TrackHistoryDate from '../TrackHistoryDate/TrackHistoryDate';

interface IHistoryCardProps {
  history: ITrackHistory;
}

const HistoryCard: FC<IHistoryCardProps> = ({ history }) => {
  return (
    <div className={classes.table_row}>
      <div className={classes.table_cell}>
        <div className={classes.artist_info}>
          <div className={classes.artist_photo}>
            <ArtistAvatar
              avatar={history.artist.image}
              name={history.artist.name}
            />
          </div>
          <div className={classes.artist_name}>
            <ArtistName name={history.artist.name} />
          </div>
        </div>
      </div>

      <div className={classes.table_cell}>
        <div className={classes.track_name}>
          <TrackName name={history.track.name} />
        </div>
      </div>

      <div className={classes.table_cell}>
        <div className={classes.track_history_date}>
          <TrackHistoryDate date={history.datetime} />
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
