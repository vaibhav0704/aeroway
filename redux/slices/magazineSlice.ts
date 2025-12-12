
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Magazine {
  magazine_id: number;
  idMagazines: number;
  magazine_title: string;
  magazine_description: string;
  magazine_tags?: string;
  magazine_cover_image: string;
  magazine_link?: string;
  magazine_slug: string;
  formatted_date: string;
  magazine_category?: string;
  MagCloudLink?: string;
}

interface MagazineState {
  magazines: Magazine[];
  loading: boolean;
  error: string | null;
}

const initialState: MagazineState = {
  magazines: [],
  loading: false,
  error: null,
};


export const fetchMagazines = createAsyncThunk(
  "magazines/fetchMagazines",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/magazine/fetchall");
      return response.data as Magazine[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const magazineSlice = createSlice({
  name: "magazines",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMagazines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMagazines.fulfilled,
        (state, action: PayloadAction<Magazine[]>) => {
          state.loading = false;
          state.magazines = action.payload;
        }
      )
      .addCase(fetchMagazines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default magazineSlice.reducer;
