import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    // auth: authSlice.reducer,
    // dashboard: dashboardSlice.reducer,
    // profile: profileSlice.reducer,
    // // Add other slices as needed
  },
});

export default store;
