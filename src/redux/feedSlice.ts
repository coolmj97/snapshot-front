import { createSlice } from '@reduxjs/toolkit';

export interface FeedState {
  title: string;
  photos: {
    url: string;
    id: string;
  }[];
  content: string;
}

const initialState: FeedState = {
  title: '',
  photos: [],
  content: '',
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setPhoto: (state, action) => {
      state.photos = [...state.photos, action.payload];
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    deletePhoto: (state, action) => {
      const filteredPhotos = state.photos.filter((photo) => photo.id !== action.payload);
      state.photos = filteredPhotos;
    },
    resetForm: () => initialState,
  },
});

export const { setTitle, setPhoto, setContent, deletePhoto, resetForm } = feedSlice.actions;

export default feedSlice.reducer;
