import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { editUser, setAuth } from "./slices/authSlice";



interface FormDataType {
  name: string;
  username: string;
  email: string;
  user_profile?: File | string;
  profession: string;
  bio: string;
}



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
  (id: string, updatedData: FormDataType ) =>
  async (dispatch: Dispatch) => {
    try {
      const formData = new FormData();

      for (const key in updatedData) {
        const value = updatedData[key as keyof FormDataType];
        if (value !== undefined && value !== null) {
          formData.append(key, value as string | Blob);
        }
      }


      if (!formData.get("id")) {
        formData.append("id", id);
      }

  
      const response = await axios.put("/api/auth/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

  
      dispatch(editUser(response.data));

      dispatch(
        setAuth({
          isAuthenticated: true,
          userId: response.data.idauth || id,
          name: response.data.name || "",
          username: response.data.username || "",
          profile: response.data.profile || "",
          profession: response.data.profession || "",
          email: response.data.email || "",
          bio: response.data.bio || "",
        })
      );

      alert("User updated successfully");
    } catch (error: any) {
      console.error("Error updating user:", getErrorMessage(error));
      alert(getErrorMessage(error) || "Error updating user");
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
