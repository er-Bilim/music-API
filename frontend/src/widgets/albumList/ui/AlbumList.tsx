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

const AlbumList = () => {
  const {
    albums,
    fetchLoading: albumLoading,
    getArtistAlbums,
    error: albumError,
  } = useAlbumStore((state) => state);
  const {
    artist,
    getArtist,
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
  }, [getArtist, getArtistAlbums, artist_id]);

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

    if (artistError || albumError) {
      return (
        <>
          <p className={classes.artist_list_error}>{artistError}</p>
          <p className={classes.artist_list_error}>{albumError}</p>
        </>
      );
    }

    return (
      <>
        {albums.map((album) => (
          <Link to={`/tracks?album=${album._id}`}>
            <AlbumCard album={album} key={album._id} />
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
              <ArtistAvatar avatar={artist.image} name={artist.name} />
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
