import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLatestPosts = createAsyncThunk(
  "posts/latest",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/blogs/fetchlatest");
      return data;
    } catch (err: any) {
      return rejectWithValue("Failed to fetch latest posts");
    }
  }
);

interface PostState {
  latestPosts: any[];
  latestStatus?: "idle" | "loading" | "succeeded" | "failed";
  latestError?: string | null;
}

const initialState: PostState = {
  latestPosts: [],
  latestStatus: "idle",
  latestError: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestPosts.pending, (state) => {
        state.latestStatus = "loading";
      })
      .addCase(fetchLatestPosts.fulfilled, (state, action) => {
        state.latestStatus = "succeeded";
        state.latestPosts = action.payload;
      })
      .addCase(fetchLatestPosts.rejected, (state, action) => {
        state.latestStatus = "failed";
        state.latestError = action.payload as string;
      });
  },
});

export default postSlice.reducer;
