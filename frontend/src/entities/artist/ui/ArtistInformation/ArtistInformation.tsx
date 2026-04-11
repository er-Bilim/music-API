import type { FC } from 'react';
import classes from './ArtistInformation.module.css';

interface IArtistInformationProps {
  information: string;
}

const ArtistInformation: FC<IArtistInformationProps> = ({ information }) => {
  return <p className={classes.artist_information}>{information}</p>;
};

export default ArtistInformation;
