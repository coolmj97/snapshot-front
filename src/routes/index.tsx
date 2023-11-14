import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Intro from '@/pages/IntroPage';
import Login from '@/pages/LoginPage';
import Signup from '@/pages/SignupPage';
import UserSetting from '@/pages/UserSettingPage';
import FeedCreatePage from '@/pages/feed/FeedCreatePage';
import FeedDetailPage from '@/pages/feed/FeedDetailPage';
import FeedEditPage from '@/pages/feed/FeedEditPage';
import FeedListPage from '@/pages/feed/FeedListPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />

        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/feed">
          <Route path="/feed/list" element={<FeedListPage />} />
          <Route path="/feed/create" element={<FeedCreatePage />} />
          <Route path="/feed/:id/edit" element={<FeedEditPage />} />
          <Route path="/feed/:id" element={<FeedDetailPage />} />
        </Route>

        <Route path="/user/setting" element={<UserSetting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
