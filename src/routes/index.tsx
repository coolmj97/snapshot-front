import Intro from '@/features/intro/Intro';
import Login from '@/features/login/Login';
import Signup from '@/features/signup/Signup';
import UserSetting from '@/features/userSetting/UserSetting';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />

        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/feed">
          <Route path="/feed/create" />
          <Route path="/feed/:id/modify" />
          <Route path="/feed/:id" />
        </Route>

        <Route path="/account/setting" element={<UserSetting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
