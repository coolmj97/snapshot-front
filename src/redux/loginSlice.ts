import { createSlice } from '@reduxjs/toolkit';
import { SignUpState } from './signUpSlice';

export interface LoginFormState extends SignUpState {
  isLogin: boolean;
}

const initialState: LoginFormState = { email: '', password: '', isLogin: false };

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeLoginForm: (state, action) => {
      const { key, value } = action.payload;
      (state as any)[key] = value;
    },
    logInCheck: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { changeLoginForm, logInCheck } = loginSlice.actions;

export default loginSlice.reducer;
