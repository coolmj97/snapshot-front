import { createSlice } from '@reduxjs/toolkit';
import { SignUpState } from './signUpSlice';

export interface LoginFormState extends SignUpState {
  isLoggedIn: boolean;
}

const initialState: LoginFormState = { email: '', password: '', isLoggedIn: false };

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeLoginForm: (state, action) => {
      const { key, value } = action.payload;
      (state as any)[key] = value;
    },
    logInCheck: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    resetLoginForm: () => initialState,
  },
});

export const { changeLoginForm, logInCheck, resetLoginForm } = loginSlice.actions;

export default loginSlice.reducer;
