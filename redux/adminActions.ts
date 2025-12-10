import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { setAdmin } from "./slices/adminSlice";

export const adminLogin =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      const res = await axios.post(
        "/api/admin/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.Status === "Success") {
        dispatch(
          setAdmin({
            ...res.data.admin,
            isAuthenticated: true,
          })
        );
        console.log("from-admin-actions", res.data);

        return { success: true };
      }

      return { success: false, error: res.data.Error };
    } catch (error: any) {
      return {
        success: false,
        error:
          error?.response?.data?.Error ||
          error?.message ||
          "Something went wrong",
      };
    }
  };

export const adminLogout = () => async (dispatch: Dispatch) => {
  try {
    await axios.post("/api/admin/logout", {}, { withCredentials: true });

    dispatch(
      setAdmin({
        isAuthenticated: false,
        id: null,
        name: "",
        number: null,
        email: "",
      })
    );
  } catch (err) {
    console.error("Logout failed:", err);
  }
};
