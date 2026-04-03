import MainLayout from './shared/ui/Layouts/MainLayout';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/main/HomePage';
import TrackPage from './pages/track/TrackPage';
import NotFound from './shared/ui/NotFound/NotFound';
import AlbumPage from './pages/album/AlbumPage';
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';

const App = () => {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/albums" element={<AlbumPage />}></Route>
          <Route path="/tracks" element={<TrackPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<RegisterPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </MainLayout>
    </>
  );
};

export default App;
