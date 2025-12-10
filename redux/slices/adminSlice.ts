import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  isAuthenticated: boolean;
  id: string | null;
  name?: string;
  number?: string | null;
  image?: string | null;
  profession?: string;
  email?: string;
  bio?: string;
}

const initialState: AdminState = {
  isAuthenticated: false,
  id: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin(state, action: PayloadAction<AdminState>) {
      return { ...state, ...action.payload };
    },

    editAdmin(state, action: PayloadAction<Partial<AdminState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setAdmin, editAdmin } = adminSlice.actions;
export default adminSlice.reducer;
