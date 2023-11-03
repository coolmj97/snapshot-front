import { BrowserRouter, Route } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default Router;
