import { useCallback, useEffect } from 'react';
import { useArtistStore } from '../../../entities/artist/model/artistStore';
import ArtistCard from '../../../entities/artist/ui/ArtistCard/ArtistCard';
import classes from './ArtistList.module.css';
import Loader from '../../../shared/ui/Loader/Loader';
import { Link } from 'react-router-dom';

const ArtistList = () => {
  const { artists, getLoading, getArtists } = useArtistStore((state) => state);

  const getArtistsHandle = useCallback(async () => {
    await getArtists();
  }, [getArtists]);

  useEffect(() => {
    getArtistsHandle();
  }, [getArtistsHandle]);

  const renderContent = () => {
    if (getLoading) {
      return (
        <>
          <div className="center-loader">
            <Loader />
          </div>
        </>
      );
    }

    return (
      <>
        <div className={classes.artist_list_content}>
          {artists.map((artist) => (
            <Link to={`/albums?artist=${artist._id}`}>
              <ArtistCard artist={artist} key={artist._id} />
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <section className={classes.artist_list_section}>
      <p className={classes.artist_list_title}>Artists</p>
      {renderContent()}
    </section>
  );
};

export default ArtistList;
