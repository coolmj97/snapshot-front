import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Intro from '@/pages/IntroPage';
import UserSettingPage from '@/pages/UserSettingPage';
import FeedCreatePage from '@/pages/feed/FeedCreatePage';
import FeedDetailPage from '@/pages/feed/FeedDetailPage';
import FeedEditPage from '@/pages/feed/FeedEditPage';
import FeedListPage from '@/pages/feed/FeedListPage';
import SignUpPage from '@/pages/SignUpPage';
import LoginPage from '@/pages/LoginPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />

        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/feed">
          <Route path="/feed/list" element={<FeedListPage />} />
          <Route path="/feed/create" element={<FeedCreatePage />} />
          <Route path="/feed/:id/edit" element={<FeedEditPage />} />
          <Route path="/feed/:id" element={<FeedDetailPage />} />
        </Route>

        <Route path="/user/setting" element={<UserSettingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
