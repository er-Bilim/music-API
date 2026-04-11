import { useEffect } from 'react';
import { useTracksStore } from '../../../entities/track/model/trackStore';
import TrackCard from '../../../entities/track/ui/TrackCard/TrackCard';
import Loader from '../../../shared/ui/Loader/Loader';
import Title from '../../../shared/ui/Title/Title';
import classes from './TrackList.module.css';
import { useSearchParams } from 'react-router-dom';
import { useAlbumStore } from '../../../entities/album/model/albumStore';
import AlbumCover from '../../../entities/album/ui/AlbumCover/AlbumCover';
import ArtistAvatar from '../../../entities/artist/ui/ArtistAvatar/ArtistAvatar';
import ArtistName from '../../../entities/artist/ui/ArtistName/ArtistName';
import PlayButton from '../../../features/playTrack/ui/PlayButton/PlayButton';
import type { ITrack } from '../../../entities/track/model/track.types';
import { useUserStore } from '../../../entities/user/model/userStore';
import Status from '../../../shared/ui/Status/Status';
import AlbumName from '../../../entities/album/ui/AlbumName/AlbumName';
import AlbumReleaseYear from '../../../entities/album/ui/AlbumReleaseYear/AlbumReleaseYear';

const TrackList = () => {
  const {
    album,
    fetchLoading: fetchAlbumLoading,
    getArtistAlbum,
    clearAlbum,
    error: albumError,
  } = useAlbumStore((state) => state);

  const { user } = useUserStore((state) => state);

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

  const renderStatus = (status: boolean) => {
    if (user && user.user.role === 'admin') {
      return (
        <>
          <Status status={status} />
        </>
      );
    }
  };

  const renderPlayButton = (track: ITrack) => {
    if (user && album && album.artist[0]) {
      const artist = album.artist[0];
      return (
        <div className={classes.play_button}>
          <PlayButton track={track} artist={artist} />
        </div>
      );
    }

    return null;
  };

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
          <div key={track._id} className={classes.track_card}>
            <div className={classes.track_card_action}>
              <TrackCard track={track} />
              {renderPlayButton(track)}
            </div>
            <div className={classes.status}>
              {renderStatus(track.isPublished)}
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <section className={classes.track_list_section}>
        {album && (
          <>
            <div className={classes.artist_block}>
              <div className={classes.artist_block_content}>
                {album.artist.map((artist) => (
                  <div className={classes.artist_content}>
                    <div className={classes.artist_info}>
                      <div className={classes.artist_avatar}>
                        <ArtistAvatar
                          avatar={artist.image}
                          name={artist.name}
                        />
                      </div>
                      <div className={classes.artist_title}>
                        <Title title="artist" />
                      </div>
                      <div className={classes.artist_name}>
                        <ArtistName name={artist.name} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={classes.album_track_block}>
              <div className={classes.album}>
                <div className={classes.album_cover}>
                  <AlbumCover cover={album.image} name={album.name} />
                </div>
                <div className={classes.album_info}>
                  <div className={classes.album_title}>
                    <Title title="album" />
                  </div>
                  <div className={classes.album_name}>
                    <AlbumName name={album.name} />
                  </div>
                  <div className={classes.album_release_year}>
                    <p>Released</p>
                    <AlbumReleaseYear release_year={album.release_year} />
                  </div>
                </div>
              </div>

              <div className={classes.track_list}>
                <div className={classes.track_list_title}>
                  <Title title={`${album.name} tracklist`} />
                </div>
                <div className={classes.track_list_content}>
                  {renderContent()}
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
