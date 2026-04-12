import { useForm } from 'react-hook-form';
import { useAlbumStore } from '../../../../../entities/album/model/albumStore';
import { useArtistStore } from '../../../../../entities/artist/model/artistStore';
import {
  schemaCreateTrack,
  type CreateTrackFormData,
} from '../../lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Loader from '../../../../../shared/ui/Loader/Loader';
import Alert from '../../../../../shared/ui/Alert/Alert';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './CreateTrackForm.module.css';
import { useTracksStore } from '../../../../../entities/track/model/trackStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWebAwesome } from '@fortawesome/free-solid-svg-icons';
import Title from '../../../../../shared/ui/Title/Title';

const CreateTrackForm = () => {
  const navigate = useNavigate();
  const [artistID, setArtistID] = useState<string | null>(null);

  const {
    artists,
    getArtists,
    fetchLoading: artistFetchLoading,
    error: artistFetchError,
  } = useArtistStore((state) => state);

  const {
    albums,
    getArtistAlbums,
    error: albumFetchError,
  } = useAlbumStore((state) => state);

  const { createTrack, createLoading } = useTracksStore((state) => state);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTrackFormData>({
    resolver: zodResolver(schemaCreateTrack),
  });

  useEffect(() => {
    getArtists();
  }, [getArtists]);

  useEffect(() => {
    if (artistID) {
      getArtistAlbums(artistID);
    }
  }, [getArtistAlbums, artistID]);

  const handleChangeArtistSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value: artistIDValue } = event.target;
    setArtistID(artistIDValue);
  };

  const renderArtistsSelect = () => {
    if (artistFetchLoading) {
      return (
        <>
          <Loader />
        </>
      );
    }

    if (artistFetchError) {
      return (
        <>
          <Alert type="error" message={artistFetchError.error} />
        </>
      );
    }

    return (
      <>
        <select
          id="artist_id"
          title="artist"
          className={classes.select}
          defaultValue="artist"
          onChange={handleChangeArtistSelect}
        >
          <option value="artist" disabled>
            select artist
          </option>
          {artists.map((artist) => (
            <option key={artist._id} value={artist._id}>
              {artist.name}
            </option>
          ))}
        </select>
      </>
    );
  };

  const renderAlbumSelect = () => {
    if (albumFetchError) {
      return (
        <>
          <Alert type="error" message={albumFetchError.error} />
        </>
      );
    }

    return (
      <>
        <select
          id="album_id"
          title="album"
          className={classes.select}
          {...register('album_id')}
          defaultValue="album"
        >
          <option value="album" disabled>
            select album
          </option>
          {albums.map((album) => (
            <option key={album._id} value={album._id}>
              {album.name}
            </option>
          ))}
        </select>
      </>
    );
  };

  const createTrackSubmit = async (data: CreateTrackFormData) => {
    try {
      await createTrack(data)
        .then(() => reset())
        .then(() => navigate('/'));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={classes.form_block}>
        <div className={classes.form_icon}>
          <FontAwesomeIcon icon={faWebAwesome} />
        </div>
        <div className={classes.form_title}>
          <Title title="Create track" />
        </div>

        <form onSubmit={handleSubmit(createTrackSubmit)}>
          <div className={classes.form_inputs_block}>
            <div className={classes.form_input_content}>
              <label htmlFor="name" className={classes.form_input_label}>
                Artist
              </label>
              {renderArtistsSelect()}
            </div>

            {artistID && (
              <>
                <div className={classes.form_input_content}>
                  <label htmlFor="name" className={classes.form_input_label}>
                    Album
                  </label>
                  {renderAlbumSelect()}
                </div>
              </>
            )}
            <div className={classes.form_input_content}>
              <label htmlFor="name" className={classes.form_input_label}>
                Name
              </label>
              <input
                id="name"
                className={classes.form_input}
                type="text"
                {...register('name')}
                placeholder="Name"
              />
              {errors.name && (
                <p className={classes.form_input_error}>
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className={classes.form_input_content}>
              <label htmlFor="time" className={classes.form_input_label}>
                Time
              </label>
              <input
                id="time"
                className={classes.form_input}
                type="string"
                {...register('time')}
                placeholder="Time"
              />
              {errors.time && (
                <p className={classes.form_input_error}>
                  {errors.time.message}
                </p>
              )}
            </div>
            <div className={classes.form_input_content}>
              <label htmlFor="youtubeLink" className={classes.form_input_label}>
                Youtube Link
              </label>
              <input
                id="youtubeLink"
                className={classes.form_input}
                type="string"
                {...register('youtubeLink')}
                placeholder="Youtube Link"
              />
              {errors.youtubeLink && (
                <p className={classes.form_input_error}>
                  {errors.youtubeLink.message}
                </p>
              )}
            </div>

            <button
              className={classes.form_submit_button}
              type="submit"
              disabled={createLoading}
            >
              create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateTrackForm;
