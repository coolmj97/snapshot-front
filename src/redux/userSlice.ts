import { UserFormData } from '@/apis/user/userApi.types';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState extends UserFormData {
  profileImg?: string;
  passwordCheck: string;
}

const initialState: UserState = {
  profileImg: '',
  email: '',
  password: '',
  passwordCheck: '',
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setForm: (state, action) => {
      const { key, value } = action.payload;
      (state as any)[key] = value;
    },
    setProfileImg: (state, action) => {
      state.profileImg = action.payload;
    },
    resetProfileImg: (state) => {
      state.profileImg = initialState.profileImg;
    },
    resetSignUpForm: () => initialState,
  },
});

export const { setForm, setProfileImg, resetProfileImg, resetSignUpForm } = userSlice.actions;

export default userSlice.reducer;
