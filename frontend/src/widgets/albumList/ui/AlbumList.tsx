import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAlbumStore } from '../../../entities/album/model/albumStore';
import classes from './AlbumList.module.css';
import Loader from '../../../shared/ui/Loader/Loader';
import AlbumCard from '../../../entities/album/ui/AlbumCard/AlbumCard';
import ArtistAvatar from '../../../entities/artist/ui/ArtistAvatar/ArtistAvatar';
import { useArtistStore } from '../../../entities/artist/model/artistStore';
import ArtistName from '../../../entities/artist/ui/ArtistName/ArtistName';
import Status from '../../../shared/ui/Status/Status';
import ArtistInformation from '../../../entities/artist/ui/ArtistInformation/ArtistInformation';
import type { IAlbum } from '../../../entities/album/model/album.types';
import DeleteAlbum from '../../../features/album/delete/ui/DeleteAlbum';
import PublishAlbum from '../../../features/album/publish/ui/PublishAlbum';
import AdminActions from '../../adminActions/ui/AdminActions';

const AlbumList = () => {
  const {
    albums,
    fetchLoading: albumLoading,
    getArtistAlbums,
    clearAlbums,
    updateLoading,
    deleteLoading,
  } = useAlbumStore((state) => state);

  const {
    artist,
    getArtist,
    clearArtist,
    fetchLoading: artistLoading,
    error: artistError,
  } = useArtistStore((state) => state);

  const [queryParams] = useSearchParams();

  const artist_id = queryParams.get('artist');

  useEffect(() => {
    if (artist_id) {
      getArtist(artist_id);
      getArtistAlbums(artist_id);
    }

    return () => {
      clearArtist();
      clearAlbums();
    };
  }, [
    getArtist,
    getArtistAlbums,
    clearArtist,
    clearAlbums,
    artist_id,
    updateLoading,
    deleteLoading,
  ]);

  const renderContent = () => {
    if (albumLoading && artistLoading) {
      return (
        <>
          <div className="center_loader">
            <Loader />
          </div>
        </>
      );
    }

    if (albums.length === 0) {
      return (
        <>
          <p className={classes.artist_list_empty}>No albums</p>
        </>
      );
    }

    if (artistError) {
      return (
        <>
          <p className={classes.artist_list_error}>{artistError.error}</p>
        </>
      );
    }

    return (
      <>
        {albums.map((album) => (
          <div key={album._id} className={classes.album}>
            <Link
              to={`/tracks?album=${album._id}`}
              key={album._id}
              className={classes.album_card}
            >
              <AlbumCard album={album} />
            </Link>
            <AdminActions>
              <div className={classes.album_admin_actions}>
                <Status status={album.isPublished} />
                {renderActions(album)}
              </div>
            </AdminActions>
          </div>
        ))}
      </>
    );
  };

  const renderActions = (artist: IAlbum) => {
    if (artist.isPublished) {
      return (
        <>
          <DeleteAlbum id={artist._id} />
        </>
      );
    }

    return (
      <>
        <PublishAlbum id={artist._id} />
      </>
    );
  };

  return (
    <>
      <section className={classes.album_section}>
        {artist && (
          <>
            <div className={classes.artist_content}>
              <div className={classes.artist_info}>
                <div className={classes.artist_avatar}>
                  <ArtistAvatar avatar={artist.image} name={artist.name} />
                </div>
                <div className={classes.artist_name}>
                  <ArtistName name={artist.name} />
                </div>
                <div className={classes.artist_information}>
                  <ArtistInformation information={artist.information} />
                </div>
              </div>
            </div>
            <div>
              <div className={classes.albums_artist_title}>
                <ArtistName name={artist.name} />
                <p>albums</p>
              </div>
              <div className={classes.album_list}>{renderContent()}</div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default AlbumList;
