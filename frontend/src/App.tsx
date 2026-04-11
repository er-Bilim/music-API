import MainLayout from './shared/ui/Layouts/MainLayout';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/main/HomePage';
import TrackPage from './pages/track/TrackPage';
import NotFound from './shared/ui/NotFound/NotFound';
import AlbumPage from './pages/album/AlbumPage';
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';
import TrackHistoryPage from './pages/track/TrackHistoryPage';
import { useUserStore } from './entities/user/model/userStore';
import ProtectedRouter from './app/providers/router/ProtectedRoute';
import CreateArtistPage from './pages/createArtist/CreateArtistPage';
import CreateAlbumPage from './pages/createAlbum/CreateAlbumPage';
import CreateTrackPage from './pages/createTrack/CreateTrackPage';

const App = () => {
  const { user } = useUserStore((state) => state);

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/albums" element={<AlbumPage />} />
          <Route path="/tracks" element={<TrackPage />} />

          <Route
            path="/track-history"
            element={
              <ProtectedRouter isAuth={Boolean(user)}>
                <TrackHistoryPage />
              </ProtectedRouter>
            }
          />
          <Route
            path="/create-artist"
            element={
              <ProtectedRouter isAuth={Boolean(user)}>
                <CreateArtistPage />
              </ProtectedRouter>
            }
          />
          <Route
            path="/create-album"
            element={
              <ProtectedRouter isAuth={Boolean(user)}>
                <CreateAlbumPage />
              </ProtectedRouter>
            }
          />
          <Route
            path="/create-track"
            element={
              <ProtectedRouter isAuth={Boolean(user)}>
                <CreateTrackPage />
              </ProtectedRouter>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRouter isAuth={Boolean(!user)}>
                <LoginPage />
              </ProtectedRouter>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRouter isAuth={Boolean(!user)}>
                <RegisterPage />
              </ProtectedRouter>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </>
  );
};

export default App;
