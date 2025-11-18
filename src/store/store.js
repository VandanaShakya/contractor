// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import profileReducer from '../features/adminProfileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export default store;
