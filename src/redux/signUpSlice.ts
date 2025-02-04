import { createSlice } from '@reduxjs/toolkit';

export interface SignUpState {
  email: string;
  password: string;
}

const initialState: SignUpState = { email: '', password: '' };

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const { signUp } = signUpSlice.actions;

export default signUpSlice.reducer;
