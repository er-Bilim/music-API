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

const App = () => {
  const { user } = useUserStore((state) => state);

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/albums" element={<AlbumPage />}></Route>
          <Route path="/tracks" element={<TrackPage />}></Route>
          <Route
            path="/track-history"
            element={
              <ProtectedRouter isAuth={Boolean(user)}>
                <TrackHistoryPage />
              </ProtectedRouter>
            }
          ></Route>
          <Route
            path="/create-artist"
            element={
              <ProtectedRouter isAuth={Boolean(user)}>
                <CreateArtistPage />
              </ProtectedRouter>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <ProtectedRouter isAuth={Boolean(!user)}>
                <LoginPage />
              </ProtectedRouter>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <ProtectedRouter isAuth={Boolean(!user)}>
                <RegisterPage />
              </ProtectedRouter>
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </MainLayout>
    </>
  );
};

export default App;
