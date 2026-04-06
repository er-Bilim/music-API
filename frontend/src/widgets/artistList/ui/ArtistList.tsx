import { useEffect } from 'react';
import { useArtistStore } from '../../../entities/artist/model/artistStore';
import ArtistCard from '../../../entities/artist/ui/ArtistCard/ArtistCard';
import classes from './ArtistList.module.css';
import Loader from '../../../shared/ui/Loader/Loader';
import { Link } from 'react-router-dom';
import Title from '../../../shared/ui/Title/Title';

const ArtistList = () => {
  const { artists, fetchLoading, getArtists, clearArtists, error } =
    useArtistStore((state) => state);

  useEffect(() => {
    getArtists();

    return () => {
      clearArtists();
    };
  }, [getArtists, clearArtists]);

  const renderContent = () => {
    if (fetchLoading) {
      return (
        <>
          <div className="center_loader artist_loader">
            <Loader />
          </div>
        </>
      );
    }

    if (artists.length === 0) {
      return (
        <>
          <p className={classes.artist_list_empty}>No artists</p>
        </>
      );
    }

    if (error) {
      return (
        <>
          <p className={classes.artist_list_error}>{error.error}</p>
        </>
      );
    }

    return (
      <>
        {artists.map((artist) => (
          <Link to={`/albums?artist=${artist._id}`} key={artist._id}>
            <ArtistCard artist={artist} />
          </Link>
        ))}
      </>
    );
  };

  return (
    <section>
      <Title title={'Artists'} />
      <div className={classes.artist_list_content}>{renderContent()}</div>
    </section>
  );
};

export default ArtistList;
