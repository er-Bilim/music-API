import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePlayerState } from '../../model/usePlayerStore';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import type { FC } from 'react';
import classes from './PlayButton.module.css';

interface IPlayButtonProps {
  track: string;
  artist: string;
}

const PlayButton: FC<IPlayButtonProps> = ({ track, artist }) => {
  const { playTrack } = usePlayerState((state) => state);

  return (
    <button
      type="button"
      onClick={() => playTrack({ artist, track })}
      title="play track"
      className={classes.play_button}
    >
      <FontAwesomeIcon icon={faPlay} />
    </button>
  );
};

export default PlayButton;
