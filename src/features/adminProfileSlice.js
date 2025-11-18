// src/store/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // optional, only if you use the thunk

// Optional: async thunk to upload image to backend and return URL
export const uploadProfilePic = createAsyncThunk(
  "profile/uploadProfilePic",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("profilePic", file);

      // Example: POST to your upload endpoint -> return { url: 'https://...' }
      const res = await axios.post("/api/upload-dp", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Expect backend to respond with { url: "https://..." }
      return res.data.url;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  profilePic: null, // url string
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfilePic(state, action) {
      state.profilePic = action.payload;
    },
    clearProfilePic(state) {
      state.profilePic = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadProfilePic.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadProfilePic.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profilePic = action.payload;
      })
      .addCase(uploadProfilePic.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Upload failed";
      });
  },
});

export const { setProfilePic, clearProfilePic } = profileSlice.actions;

export default profileSlice.reducer;
