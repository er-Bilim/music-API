import { useAlbumStore } from '../../../../../entities/album/model/albumStore';
import { useNavigate } from 'react-router-dom';
import {
  schemaCreateAlbum,
  type CreateAlbumFormData,
} from '../../lib/validation';
import { useEffect, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import classes from './CreateAlbumForm.module.css';
import Title from '../../../../../shared/ui/Title/Title';
import FileInput from '../../../../../shared/ui/FileInput/FileInput';
import { useArtistStore } from '../../../../../entities/artist/model/artistStore';
import Loader from '../../../../../shared/ui/Loader/Loader';
import Alert from '../../../../../shared/ui/Alert/Alert';

const CreateAlbumForm = () => {
  const { artists, getArtists, fetchLoading, error } = useArtistStore(
    (state) => state,
  );
  const { createAlbum, createLoading } = useAlbumStore((state) => state);
  const navigate = useNavigate();

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAlbumFormData>({
    resolver: zodResolver(schemaCreateAlbum),
  });

  useEffect(() => {
    getArtists();
  }, [getArtists]);

  const renderArtistsSelect = () => {
    if (fetchLoading) {
      return (
        <>
          <Loader />
        </>
      );
    }

    if (error) {
      return (
        <>
          <Alert type="error" message={error.error} />
        </>
      );
    }

    return (
      <>
        <select
          id="artist_id"
          title="artist"
          className={classes.select}
          {...register('artist_id')}
          defaultValue="artist"
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

  const createAlbumSubmit = async (data: CreateAlbumFormData) => {
    try {
      await createAlbum(data)
        .then(() => reset())
        .then(() => navigate('/'));
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;

    if (files && files[0] && name === 'image') {
      setValue(name, files[0]);
    }
  };

  return (
    <>
      <div className={classes.form_block}>
        <div className={classes.form_icon}>
          <FontAwesomeIcon icon={faSun} />
        </div>
        <div className={classes.form_title}>
          <Title title="Create Album" />
        </div>

        <form onSubmit={handleSubmit(createAlbumSubmit)}>
          <div className={classes.form_inputs_block}>
            <div className={classes.form_input_content}>
              <label htmlFor="name" className={classes.form_input_label}>
                Artist
              </label>
              {renderArtistsSelect()}
              {errors.name && (
                <p className={classes.form_input_error}>
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className={classes.form_input_content}>
              <label htmlFor="name" className={classes.form_input_label}>
                Name
              </label>
              <input
                id="name"
                className={classes.form_input}
                type="text"
                {...register('name')}
                placeholder="name"
              />
              {errors.name && (
                <p className={classes.form_input_error}>
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className={classes.form_input_content}>
              <label
                htmlFor="release_year"
                className={classes.form_input_label}
              >
                Release year
              </label>
              <input
                id="release_year"
                className={classes.form_input}
                type="number"
                {...register('release_year', { valueAsNumber: true })}
                placeholder="release year"
              />
              {errors.release_year && (
                <p className={classes.form_input_error}>
                  {errors.release_year.message}
                </p>
              )}
            </div>

            <div className={classes.form_input_content}>
              <label htmlFor="image" className={classes.form_input_label}>
                Album photo
              </label>
              <div className={classes.form_input_file}>
                <FileInput
                  label="Artist Photo"
                  {...register('image')}
                  onChange={onChangeFileHandler}
                />
                {errors.image && (
                  <p className={classes.form_input_error}>
                    {errors.image.message}
                  </p>
                )}
              </div>
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

export default CreateAlbumForm;
