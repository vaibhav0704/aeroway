import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/blogs/fetch");
      return Array.isArray(data) ? data : [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch blogs");
    }
  }
);

export const getIndividualBlog = createAsyncThunk(
  "blogs/getIndividual",
  async (slug: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/blogs/fetch/${slug}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch blog");
    }
  }
);

export const fetchBlogByCategory = createAsyncThunk(
  "blogs/byCategory",
  async (categorySlug: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/blogs/fetchByCategory/${categorySlug}`);
      return data;
    } catch (err: any) {
      return rejectWithValue("Failed to fetch category blogs");
    }
  }
);

export const getBlogsByTag = createAsyncThunk(
  "blogs/byTag",
  async (tag: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/blogs/fetchByTag/${tag}`);
      return data;
    } catch (err: any) {
      return rejectWithValue("Failed to fetch tagged blogs");
    }
  }
);

interface BlogState {
  blogs: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  status: "idle",
  error: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // individual blog
      .addCase(getIndividualBlog.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })

      // fetch by category
      .addCase(fetchBlogByCategory.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })

      // fetch by tag
      .addCase(getBlogsByTag.fulfilled, (state, action) => {
        state.blogs = action.payload;
      });
  },
});

export default blogSlice.reducer;
