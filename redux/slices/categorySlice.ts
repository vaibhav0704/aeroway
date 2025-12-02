import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

//==================== Types ====================//
interface Category {
  category_name: string;
  category_slug: string;
}

interface CategoryState {
  categories: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

//==================== Initial State ====================//
const initialState: CategoryState = {
  categories: [],
  status: "idle",
  error: null,
};

//==================== Async Thunk ====================//
export const fetchCategories = createAsyncThunk<Category[]>(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      // Call Next.js API route directly (no external URL)
      const response = await axios.get<Category[]>("/api/blogs/fetchcategories");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to fetch categories");
    }
  }
);

//==================== Slice ====================//
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.status = "succeeded";
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) || action.error.message || "Something went wrong";
      });
  },
});

//==================== Export ====================//
export default categorySlice.reducer;
