import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './redux/userSlice';
import { signUpSlice } from './redux/signUpSlice';
import { loginSlice } from './redux/loginSlice';
import { feedSlice } from './redux/feedSlice';

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    signUp: signUpSlice.reducer,
    feed: feedSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
