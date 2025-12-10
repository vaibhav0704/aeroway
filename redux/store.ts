import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./slices/blogSlice";
import postReducer from "./slices/postSlice";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import adminReducer from "./slices/adminSlice";
import magazineReducer from "./slices/magazineSlice";

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    posts: postReducer,
    auth: authReducer,
    categories: categoryReducer ,
    admin:adminReducer,
    magazines:magazineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
