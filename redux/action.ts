import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { editUser, setAuth } from "./slices/authSlice";


export const editUserProfile =
  (id: string, updatedData: Record<string, any>) =>
  async (dispatch: Dispatch) => {
    try {
      const formData = new FormData();
      for (const key in updatedData) {
        if (updatedData[key] !== undefined && updatedData[key] !== null) {
          formData.append(key, updatedData[key]);
        }
      }

      const response = await axios.put(`/api/auth/update-user/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(editUser(response.data));

      dispatch(
        setAuth({
          isAuthenticated: true,
          userId: response.data._id || id,
          name: response.data.name,
          username: response.data.username,
          profile: response.data.profile,
          profession: response.data.profession,
          email: response.data.email,
          bio: response.data.bio,
        })
      );

      alert("User updated successfully");
    } catch (error: any) {
      console.error("Error updating user:", error?.response || error.message);
      alert("Error updating user");
    }
  };


export const saveLoggedInUser = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get("/api/auth/check");

    const user = response.data;

    dispatch(
      setAuth({
        isAuthenticated: true,
        userId: user.id,
        name: user.name,
        username: user.username,
        profile: user.profile,
        profession: user.profession,
        email: user.email,
        bio: user.bio,
      })
    );

  } catch (error: any) {
    console.error("Failed to fetch logged-in user:", error?.response || error.message);

    // Clear auth state on failure
    dispatch(
      setAuth({
        isAuthenticated: false,
        userId: null,
      })
    );
  }
};
