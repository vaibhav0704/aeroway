import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { editUser, setAuth } from "./slices/authSlice";

// Utility to safely extract error message
const getErrorMessage = (error: any) => {
  return (
    error?.response?.data?.message ||
    error?.response?.statusText ||
    error?.message ||
    "Unknown error"
  );
};



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

      const response = await axios.put(
        `/api/auth/update-user/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      dispatch(editUser(response.data));

      dispatch(
        setAuth({
          isAuthenticated: true,
          userId: response.data._id || id,
          name: response.data.name || "",
          username: response.data.username || "",
          profile: response.data.profile || "",
          profession: response.data.profession || "",
          email: response.data.email || "",
          bio: response.data.bio || "",
        })
      );

      alert("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", getErrorMessage(error));
      alert("Error updating user");
    }
  };


export const saveLoggedInUser = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get("/api/auth/check", {
      withCredentials: true,
    });

    const user = response.data;

    dispatch(
      setAuth({
        isAuthenticated: true,
        userId: user.id,
        name: user.name || "",
        username: user.username || "",
        profile: user.profile || "",
        profession: user.profession || "",
        email: user.email || "",
        bio: user.bio || "",
      })
    );
  } catch (error) {
    console.log("Failed to fetch logged-in user:", getErrorMessage(error));

    dispatch(
      setAuth({
        isAuthenticated: false,
        userId: null,
        name: "",
        username: "",
        profile: "",
        profession: "",
        email: "",
        bio: "",
      })
    );
  }
};
