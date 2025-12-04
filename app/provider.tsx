"use client";

import { store } from "@/redux/store";
import { Provider } from "react-redux";
import AuthProvider from "./components/auth-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
