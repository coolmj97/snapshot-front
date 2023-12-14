import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Intro from '@/pages/IntroPage';
import UserSettingPage from '@/pages/UserSettingPage';
import FeedCreatePage from '@/pages/feed/FeedCreatePage';
import FeedDetailPage from '@/pages/feed/FeedDetailPage';
import FeedEditPage from '@/pages/feed/FeedEditPage';
import FeedListPage from '@/pages/feed/FeedListPage';
import LoginPage from '@/pages/LoginPage';
import WelcomePage from '@/pages/WelcomePage';
import PrivateRoute from '@/routes/PrivateRoute';
import RegistrationPage from '@/pages/RegistrationPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/sign-up" element={<RegistrationPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/feed/list" element={<FeedListPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/feed/create" element={<FeedCreatePage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/feed/:id/edit" element={<FeedEditPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/feed/:id" element={<FeedDetailPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/user/setting" element={<UserSettingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
