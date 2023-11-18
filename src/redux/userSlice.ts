import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
}

const initialState: UserState = { email: '', password: '', passwordCheck: '', nickname: '' };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changePassword: (state, action) => {
      state.password = action.payload;
    },
    changePasswordCheck: (state, action) => {
      state.passwordCheck = action.payload;
    },
    changeNickname: (state, action) => {
      state.nickname = action.payload;
    },
  },
});

export const { changePassword, changePasswordCheck, changeNickname } = userSlice.actions;

export default userSlice.reducer;
