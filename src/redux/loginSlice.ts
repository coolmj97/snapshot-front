import { createSlice } from '@reduxjs/toolkit';
import { SignUpState } from './signUpSlice';

export type LoginFormState = SignUpState;

const initialState: LoginFormState = { email: '', password: '' };

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      state = action.payload;
    },
  },
});

export default loginSlice.reducer;
