import { useForm } from 'react-hook-form';
import {
  schemaCreateArtist,
  type CreateArtistFormData,
} from '../../lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import type { IArtistMutation } from '../../../../entities/artist/model/artist.types';
import { useArtistStore } from '../../../../entities/artist/model/artistStore';
import classes from './CreateArtistForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import Title from '../../../../shared/ui/Title/Title';
import FileInput from '../../../../shared/ui/FileInput/FileInput';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateArtistForm = () => {
  const { createArtist, createLoading } = useArtistStore((state) => state);
  const navigate = useNavigate();

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateArtistFormData>({
    resolver: zodResolver(schemaCreateArtist),
  });

  const createArtistSubmit = async (data: IArtistMutation) => {
    try {
      await createArtist(data)
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
          <FontAwesomeIcon icon={faFire} />
        </div>
        <div className={classes.form_title}>
          <Title title="Create Artist" />
        </div>

        <form onSubmit={handleSubmit(createArtistSubmit)}>
          <div className={classes.form_inputs_block}>
            <div className={classes.form_input_content}>
              <label htmlFor="name" className={classes.form_input_label}>
                Username
              </label>
              <input
                id="name"
                className={classes.form_input}
                type="text"
                {...register('name')}
                placeholder="Username"
              />
              {errors.name && (
                <p className={classes.form_input_error}>
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className={classes.form_input_content}>
              <label htmlFor="information" className={classes.form_input_label}>
                Information
              </label>
              <input
                id="information"
                className={classes.form_input}
                type="text"
                {...register('information')}
                placeholder="information"
              />
              {errors.information && (
                <p className={classes.form_input_error}>
                  {errors.information.message}
                </p>
              )}
            </div>

            <div className={classes.form_input_content}>
              <label htmlFor="artist_photo" className={classes.form_input_label}>
                Artist photo
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

export default CreateArtistForm;
