import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAlbumStore } from '../../../entities/album/model/albumStore';
import classes from './AlbumList.module.css';
import Loader from '../../../shared/ui/Loader/Loader';
import AlbumCard from '../../../entities/album/ui/AlbumCard/AlbumCard';
import Title from '../../../shared/ui/Title/Title';
import ArtistAvatar from '../../../entities/artist/ui/ArtistAvatar/ArtistAvatar';
import { useArtistStore } from '../../../entities/artist/model/artistStore';
import ArtistName from '../../../entities/artist/ui/ArtistName/ArtistName';
import { useUserStore } from '../../../entities/user/model/userStore';
import Status from '../../../shared/ui/Status/Status';

const AlbumList = () => {
  const { user } = useUserStore((state) => state);

  const {
    albums,
    fetchLoading: albumLoading,
    getArtistAlbums,
    clearAlbums,
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
  }, [getArtist, getArtistAlbums, clearArtist, clearAlbums, artist_id]);

  const renderStatus = (status: boolean) => {
    if (user && user.user.role === 'admin') {
      return (
        <>
          <Status status={status} />
        </>
      );
    }
  };

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
          <Link to={`/tracks?album=${album._id}`} key={album._id}>
            <AlbumCard album={album} />
            {renderStatus(album.isPublished)}
          </Link>
        ))}
      </>
    );
  };

  return (
    <>
      <section>
        <div className={classes.album_artist_content}>
          <Title title={'Artist'} />
          {artist && (
            <div className={classes.album_artist_info}>
              <div className={classes.artist_avatar}>
                <ArtistAvatar avatar={artist.image} name={artist.name} />
              </div>
              <div className={classes.album_artist_info_name}>
                <ArtistName name={artist.name} />
              </div>
            </div>
          )}
        </div>
        <Title title={'Albums'} />
        <div className={classes.album_list_content}>{renderContent()}</div>
      </section>
    </>
  );
};

export default AlbumList;
