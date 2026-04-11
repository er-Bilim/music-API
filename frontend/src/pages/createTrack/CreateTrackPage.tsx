import CreateTrackForm from "../../features/createTrack/ui/forms/CreateTrackForm";
import classes from "./CreateTrack.module.css"

const CreateTrackPage = () => {
  return (
    <div className={classes.create_track}>
      <CreateTrackForm/>
    </div>
  );
};

export default CreateTrackPage;