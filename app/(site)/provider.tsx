"use client";


import { Provider } from "react-redux";
import AuthProvider from "./components/auth-provider";
import { store } from "@/redux/store";


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store }>
      <AuthProvider >{children}</AuthProvider>
    </Provider>
  );
}
