import { useEffect } from 'react';
import { useTrackHistoryStore } from '../../../entities/trackHistory/model/trackHistoryStore';
import Loader from '../../../shared/ui/Loader/Loader';
import classes from './HistoryList.module.css';
import HistoryCard from '../../../entities/trackHistory/ui/HistoryCard/HistoryCard';
import Title from '../../../shared/ui/Title/Title';

const HistoryList = () => {
  const { trackHistory, fetchLoading, fetchError, getTrackHistory } =
    useTrackHistoryStore((state) => state);

  useEffect(() => {
    getTrackHistory();
  }, [getTrackHistory]);

  const renderContent = () => {
    if (fetchLoading) {
      return (
        <>
          <div className="center_loader artist_loader">
            <Loader />
          </div>
        </>
      );
    }

    if (fetchError) {
      return (
        <>
          <p className={classes.artist_list_error}>{fetchError.error}</p>
        </>
      );
    }

    return (
      <>
        {trackHistory.map((history) => (
          <HistoryCard history={history} key={history._id} />
        ))}
      </>
    );
  };

  return (
    <section className={classes.track_history}>
      <Title title="track history" />
      <div className={classes.track_history_list}>{renderContent()}</div>
    </section>
  );
};

export default HistoryList;
