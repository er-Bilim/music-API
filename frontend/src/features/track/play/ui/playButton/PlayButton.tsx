import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import classes from './PlayButton.module.css';
import { useState, type FC } from 'react';
import Modal from '../../../../../shared/ui/Modal/Modal';
import ReactPlayer from 'react-player';
import type { ITrack } from '../../../../../entities/track/model/track.types';
import type { IArtist } from '../../../../../entities/artist/model/artist.types';
import { usePlayerState } from '../../model/usePlayerStore';
import Backdrop from '../../../../../shared/ui/Backdrop/Backdrop';

interface IPlayButtonProps {
  track: ITrack;
  artist: IArtist;
}

const PlayButton: FC<IPlayButtonProps> = ({ artist, track }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { playTrack, isPlay } = usePlayerState((state) => state);

  const handleModal = (track: string | null, artist: string | null) => {
    setIsOpen((prevState) => !prevState);
    if (track && artist) {
      playTrack({ track, artist });
    }
  };

  return (
    <>
      {isOpen && track.youtubeLink && (
        <>
          <Modal handleModal={() => handleModal(null, null)}>
            <ReactPlayer
              playing={isPlay}
              src={track.youtubeLink}
              width={'100%'}
              height={'auto'}
              controls={true}
            />
          </Modal>
          <Backdrop onClose={() => handleModal(null, null)} />
        </>
      )}
      <button
        type="button"
        onClick={() => handleModal(track._id, artist._id)}
        title="play track"
        className={classes.play_button}
      >
        <FontAwesomeIcon icon={faPlay} />
      </button>
    </>
  );
};

export default PlayButton;
