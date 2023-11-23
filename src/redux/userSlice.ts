import { UserFormData } from '@/apis/user/userApi.types';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState extends UserFormData {
  passwordCheck: string;
  isError?: boolean;
}

const initialState: UserState = {
  email: '',
  password: '',
  passwordCheck: '',
  username: '',
  isError: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeForm: (state, action) => {
      const { key, value } = action.payload;
      (state as any)[key] = value;
      state.isError = false;
    },
    checkRequestError: (state, action) => {
      state.isError = action.payload;
    },
    clearForm: () => initialState,
  },
});

export const { changeForm, checkRequestError, clearForm } = userSlice.actions;

export default userSlice.reducer;
