import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FeedState {
  photos: string[];
  content: string;
}

const initialState: FeedState = {
  photos: [],
  content: '',
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    addPhoto: (state, action) => {
      state.photos = action.payload;
    },
    addContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { addPhoto, addContent } = feedSlice.actions;

export default feedSlice.reducer;
