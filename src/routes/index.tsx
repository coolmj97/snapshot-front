import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../features/main';
import IntroPage from '../pages/Intro';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/auth">
          <Route path="/auth/sign-up" />
          <Route path="/auth/login" />
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
