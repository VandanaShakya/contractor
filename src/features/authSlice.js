// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://contractor-bay.vercel.app';

// axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const res = await axiosInstance.post('/api/auth/register', userData);
      return res.data;
    } catch (err) {
      const payload =
        err?.response?.data?.message ?? err?.response?.data ?? err?.message ?? 'Network Error';
      return thunkAPI.rejectWithValue(payload);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axiosInstance.post('/api/auth/login', credentials);
      const payload = res.data;

      // Persist canonical user shape to localStorage (raw user object)
      try {
        const user = payload.user ?? payload.data?.user ?? payload;
        // store the raw user object (not a wrapper)
        localStorage.setItem('user', JSON.stringify(user));
        // notify same-tab listeners
        window.dispatchEvent(new Event('user:auth'));
      } catch (e) {
        console.warn('Could not persist user to localStorage', e);
      }

      return payload;
    } catch (err) {
      const payload =
        err?.response?.data?.message ?? err?.response?.data ?? err?.message ?? 'Network Error';
      return thunkAPI.rejectWithValue(payload);
    }
  }
);


export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axiosInstance.post('/api/auth/logout');

      // Clear local storage first (primary)
      try {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.dispatchEvent(new Event('user:auth'));
      } catch (e) {
        console.warn('Error clearing localStorage during logout', e);
      }

      // clear local client-side auth state
      thunkAPI.dispatch(logoutLocal());
      return true;
    } catch (err) {
      // still clear local data even if server call failed
      try {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.dispatchEvent(new Event('user:auth'));
      } catch (e) {}

      thunkAPI.dispatch(logoutLocal());

      const payload = err?.response?.data ?? err?.message ?? 'Logout failed';
      return thunkAPI.rejectWithValue(payload);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get('/api/auth/me');
      return res.data; // expected { user, token? }
    } catch (err) {
      const payload = err?.response?.data ?? err?.message ?? 'Failed to fetch current user';
      return thunkAPI.rejectWithValue(payload);
    }
  }
);

// ---------------- State ----------------
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  success: false,
  isAuthenticated: false,
};

// ---------------- Slice ----------------
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    resetAuth(state) {
      Object.assign(state, initialState);
    },
    // Synchronous local logout action: clears client-side auth state immediately
    logoutLocal(state) {
      Object.assign(state, initialState);
    },
    // manual setter useful on app startup if you hydrate from storage or SSR
    setAuth(state, action) {
      const { user = null, token = null } = action.payload || {};
      state.user = user;
      state.token = token;
      state.isAuthenticated = !!(user || token);
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload?.user ?? null;
        state.token = action.payload?.token ?? null;
        state.isAuthenticated = !!(action.payload?.user || action.payload?.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message ?? 'Registration failed';
        state.success = false;
        state.isAuthenticated = false;
      })

      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload?.user ?? action.payload?.data?.user ?? action.payload ?? state.user;
        state.token = action.payload?.token ?? action.payload?.data?.token ?? state.token;
        state.isAuthenticated = !!(state.user || state.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message ?? 'Login failed';
        state.success = false;
        state.isAuthenticated = false;
      })

      // logout (async thunk)
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        // `logoutLocal` already reset state, but keep consistent fallback
        Object.assign(state, initialState);
      })
      .addCase(logout.rejected, (state, action) => {
        // `logoutLocal` already reset state in thunk; still capture error if any
        Object.assign(state, initialState);
        state.error = action.payload ?? action.error?.message ?? 'Logout failed';
      })

      // fetchCurrentUser
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user ?? null;
        state.token = action.payload?.token ?? state.token ?? null;
        state.isAuthenticated = !!action.payload?.user || !!state.token;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, resetAuth, logoutLocal, setAuth } = authSlice.actions;
export default authSlice.reducer;
