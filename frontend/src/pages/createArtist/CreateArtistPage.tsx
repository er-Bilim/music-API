import CreateArtistForm from '../../features/artist/create/ui/forms/CreateArtistForm';
import classes from './CreateArtistPage.module.css';

const CreateArtistPage = () => {
  return (
    <div className={classes.create_artist}>
      <CreateArtistForm />
    </div>
  );
};

export default CreateArtistPage;
