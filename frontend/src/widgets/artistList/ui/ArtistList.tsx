import { useEffect } from 'react';
import { useArtistStore } from '../../../entities/artist/model/artistStore';
import ArtistCard from '../../../entities/artist/ui/ArtistCard/ArtistCard';
import classes from './ArtistList.module.css';
import Loader from '../../../shared/ui/Loader/Loader';
import { Link } from 'react-router-dom';
import Title from '../../../shared/ui/Title/Title';
import { useUserStore } from '../../../entities/user/model/userStore';
import Status from '../../../shared/ui/Status/Status';
import AdminActions from '../../adminActions/ui/AdminActions';
import PublishedArtist from '../../../features/artist/publish/ui/PublishArtist';
import DeleteArtist from '../../../features/artist/delete/ui/DeleteArtist';
import type { IArtist } from '../../../entities/artist/model/artist.types';

const ArtistList = () => {
  const { user } = useUserStore((state) => state);
  const {
    artists,
    fetchLoading,
    getArtists,
    clearArtists,
    error,
    updateLoading,
    deleteLoading,
  } = useArtistStore((state) => state);

  useEffect(() => {
    getArtists();

    return () => {
      clearArtists();
    };
  }, [getArtists, clearArtists, user, updateLoading, deleteLoading]);

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

    const renderActions = (artist: IArtist) => {
      if (artist.isPublished) {
        return (
          <>
            <DeleteArtist id={artist._id} />
          </>
        );
      }

      return (
        <>
          <PublishedArtist id={artist._id} />
        </>
      );
    };

    return (
      <>
        {artists.map((artist) => (
          <div key={artist._id}>
            <Link to={`/albums?artist=${artist._id}`} key={artist._id}>
              <ArtistCard artist={artist} />
            </Link>
            <AdminActions>
              <div className={classes.artist_admin_actions}>
                <Status status={artist.isPublished} />
                {renderActions(artist)}
              </div>
            </AdminActions>
          </div>
        ))}
      </>
    );
  };

  return (
    <section className={classes.artist_section}>
      <Title title={'Artists'} />
      <div className={classes.artist_list_content}>{renderContent()}</div>
    </section>
  );
};

export default ArtistList;
