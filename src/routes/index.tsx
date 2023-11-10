import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Intro, Login, Signup, UserSetting } from '@/pages';

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
