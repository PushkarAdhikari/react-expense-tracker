import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-midnight-900 bg-[radial-gradient(ellipse_at_top_right,_#161a29_0%,_#0c0e17_70%)]">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-8 animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
}
