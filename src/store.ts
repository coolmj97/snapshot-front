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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
