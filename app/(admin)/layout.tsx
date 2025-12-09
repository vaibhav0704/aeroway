import Providers from "./admin/provider";

export default function AdminLayout({ children }) {
  return (
    <div >
      <Providers> {children}</Providers>
       
    </div>
  );
}
