// app/dashboard/layout.tsx
import React from "react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "#1e293b", // Tailwind slate-800 color
          color: "#fff",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Dashboard</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Link href="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
          <Link href="/dashboard/settings" style={{ color: "#fff", textDecoration: "none" }}>Settings</Link>
          <Link href="/dashboard/profile" style={{ color: "#fff", textDecoration: "none" }}>Profile</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem", backgroundColor: "#f1f5f9" }}>
        {children}
      </main>
    </div>
  );
}
