import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '@/features/main';
import { Intro, Login, Signup } from '@/pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/main" element={<Main />} />
        <Route path="/auth">
          <Route path="/auth/sign-up" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
        </Route>
        <Route path="/feed">
          <Route path="/feed/create" />
          <Route path="/feed/:id/modify" />
          <Route path="/feed/:id" />
        </Route>
        <Route path="/myPage" />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
