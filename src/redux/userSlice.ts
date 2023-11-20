import { UserFormData } from '@/apis/user/userApi.types';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState extends UserFormData {
  passwordCheck: string;
}

const initialState: UserState = { email: '', password: '', passwordCheck: '', username: '' };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeForm: (state, action) => {
      const { key, value } = action.payload;
      (state as any)[key] = value;
    },
  },
});

export const { changeForm } = userSlice.actions;

export default userSlice.reducer;
