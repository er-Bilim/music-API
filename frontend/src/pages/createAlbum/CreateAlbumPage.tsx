import CreateAlbumForm from '../../features/createAlbum/ui/forms/CreateAlbumForm';
import classes from './CreateAlbumPage.module.css';

const CreateAlbumPage = () => {
  return (
    <div className={classes.create_album}>
      <CreateAlbumForm />
    </div>
  );
};

export default CreateAlbumPage;
