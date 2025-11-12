    // src/features/auth/authSlice.js
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import axios from 'axios';

    const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://contractor-bay.vercel.app';


    const axiosInstance = axios.create({
    baseURL: BASE_URL || 'https://contractor-bay.vercel.app',
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
        if (err.response && err.response.data) {
            return thunkAPI.rejectWithValue(err.response.data.message || err.response.data);
        }
        return thunkAPI.rejectWithValue(err.message || 'Network Error');
        }
    }
    );

    // login (new)
    export const login = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
        const res = await axiosInstance.post('/api/auth/login', credentials);
        return res.data; 
        } catch (err) {
        if (err.response && err.response.data) {
            return thunkAPI.rejectWithValue(err.response.data.message || err.response.data);
        }
        return thunkAPI.rejectWithValue(err.message || 'Network Error');
        }
    }
    );

    // optional logout that calls server to clear HttpOnly cookie (if server supports it)
    export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
        await axiosInstance.post('/api/auth/logout'); 
        return true;
        } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message || 'Logout failed');
        }
    }
    );

    // optional fetchCurrentUser (hydrate from server-side cookie)
    export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, thunkAPI) => {
        try {
        const res = await axiosInstance.get('/api/auth/me');
        return res.data; // expected { user }
        } catch (err) {
        return thunkAPI.rejectWithValue(null);
        }
    }
    );

    const initialState = {
    user: null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: false,
    };

    // ---------- Slice ----------
    const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) { state.error = null; },
        resetAuth(state) { Object.assign(state, initialState); },
        setAuth(state, action) { // manual setter (useful on app startup)
        const { user } = action.payload || {};
        state.user = user ?? null;
        state.isAuthenticated = !!(user || token);
        },
    },
    extraReducers: (builder) => {
        builder
        // register
        .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.user = action.payload.user ?? null;
            state.token = action.payload.token ?? null;
            state.isAuthenticated = !!(action.payload.user || action.payload.token);
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? action.error?.message ?? 'Registration failed';
            state.success = false;
            state.isAuthenticated = false;
        })

        // login
        .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.user = action.payload.user ?? null;
            state.token = action.payload.token ?? null;
            state.isAuthenticated = !!(action.payload.user || action.payload.token);
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? action.error?.message ?? 'Login failed';
            state.success = false;
            state.isAuthenticated = false;
        })

        // logout
        .addCase(logout.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(logout.fulfilled, (state) => {
            Object.assign(state, initialState);
        })
        .addCase(logout.rejected, (state, action) => {
            Object.assign(state, initialState);
            state.error = action.payload ?? action.error?.message ?? null;
        })

        // fetchCurrentUser
        .addCase(fetchCurrentUser.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user ?? null;
            state.isAuthenticated = !!action.payload.user;
        })
        .addCase(fetchCurrentUser.rejected, (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        });
    }
    });

    export const { clearError, resetAuth, setAuth } = authSlice.actions;
    export default authSlice.reducer;
