// src/redux/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  name?: string;
  username?: string;
  profile?: string;
  profession?: string;
  email?: string;
  bio?: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthState>) {
      return { ...state, ...action.payload };
    },

    editUser(state, action: PayloadAction<Partial<AuthState>>) {
      return { ...state, ...action.payload }; // Merge updated user data
    },
  },
});

export const { setAuth, editUser } = authSlice.actions;
export default authSlice.reducer;
