import { useEffect } from 'react';
import { useTracksStore } from '../../../entities/track/model/trackStore';
import TrackCard from '../../../entities/track/ui/TrackCard/TrackCard';
import Loader from '../../../shared/ui/Loader/Loader';
import Title from '../../../shared/ui/Title/Title';
import classes from './TrackList.module.css';
import { useSearchParams } from 'react-router-dom';
import { useAlbumStore } from '../../../entities/album/model/albumStore';
import AlbumCover from '../../../entities/album/ui/AlbumCover/AlbumCover';
import AlbumInfo from '../../../entities/album/ui/AlbumInfo/AlbumInfo';
import ArtistAvatar from '../../../entities/artist/ui/ArtistAvatar/ArtistAvatar';
import ArtistName from '../../../entities/artist/ui/ArtistName/ArtistName';

const TrackList = () => {
  const {
    album,
    fetchLoading: fetchAlbumLoading,
    getArtistAlbum,
    clearAlbum,
    error: albumError,
  } = useAlbumStore((state) => state);

  const {
    tracks,
    fetchLoading: fetchTrackLoading,
    getTracks,
    clearTracks,
  } = useTracksStore((state) => state);

  const [queryParams] = useSearchParams();
  const album_id = queryParams.get('album');

  useEffect(() => {
    if (album_id) {
      getArtistAlbum(album_id);
      getTracks(album_id);
    }

    return () => {
      clearAlbum();
      clearTracks();
    };
  }, [getArtistAlbum, getTracks, album_id, clearAlbum, clearTracks]);

  const renderContent = () => {
    if (fetchTrackLoading && fetchAlbumLoading) {
      return (
        <>
          <div className="center_loader">
            <Loader />
          </div>
        </>
      );
    }

    if (tracks.length === 0) {
      return (
        <>
          <p className={classes.track_list_empty}>No tracks</p>
        </>
      );
    }

    if (albumError) {
      return (
        <>
          <p className={classes.track_list_error}>{albumError.error}</p>
        </>
      );
    }

    return (
      <>
        {tracks.map((track) => (
          <TrackCard track={track} />
        ))}
      </>
    );
  };

  return (
    <>
      <section>
        {album && (
          <>
            <div className={classes.artist_block}>
              <Title title="artist" />
              <div className={classes.artist_block_content}>
                {album.artist.map((artist) => (
                  <div className={classes.artist_info}>
                    <div className={classes.artist_avatar}>
                      <ArtistAvatar avatar={artist.image} name={artist.name} />
                    </div>
                    <div className={classes.artist_info_name}>
                      <ArtistName name={artist.name} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={classes.tracks_block}>
              <Title title="album" />
              <div className={classes.tracks_block_content}>
                <div className={classes.album_info_block}>
                  <AlbumCover cover={album.image} name={album.name} />
                  <AlbumInfo
                    name={album.name}
                    release_year={album.release_year}
                  />
                </div>
                <div className={classes.track_list_block}>
                  <div className={classes.track_list_title}>
                    <Title title={'Tracks'} />
                  </div>
                  <div className={classes.track_list_content}>
                    {renderContent()}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default TrackList;
