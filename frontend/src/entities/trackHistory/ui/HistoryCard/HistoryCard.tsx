import type { FC } from 'react';
import type { ITrackHistory } from '../../model/trackHistory.types';
import HistoryInfo from '../HistoryInfo/HistoryInfo';
import ArtistAvatar from '../../../artist/ui/ArtistAvatar/ArtistAvatar';
import classes from './HistoryCard.module.css';

interface IHistoryCardProps {
  history: ITrackHistory;
}

const HistoryCard: FC<IHistoryCardProps> = ({ history }) => {
  return (
    <div className={classes.history_card}>
      <div className={classes.artist}>
        <ArtistAvatar
          avatar={history.artist.image}
          name={history.artist.name}
        />
      </div>
      <HistoryInfo
        artistName={history.artist.name}
        trackName={history.track.name}
        date={history.datetime}
      />
    </div>
  );
};

export default HistoryCard;
