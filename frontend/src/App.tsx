import MainLayout from './shared/ui/Layouts/MainLayout';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/main/HomePage';
import AlbumPage from './pages/track/TrackPage';
import TrackPage from './pages/track/TrackPage';
import NotFound from './shared/ui/NotFound/NotFound';

const App = () => {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/albums" element={<AlbumPage />}></Route>
          <Route path="/albums/tracks" element={<TrackPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </MainLayout>
    </>
  );
};

export default App;
