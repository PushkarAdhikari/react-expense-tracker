import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/transactions", label: "Transactions" },
  { to: "/reports", label: "Reports" },
];

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-midnight-600/30 bg-midnight-900/80 backdrop-blur-lg px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <span className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
          ₹ Treasury
        </span>
        <div className="flex gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "bg-gold-500/10 text-gold-300" : "text-midnight-200 hover:text-midnight-50 hover:bg-midnight-700/50"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-midnight-300">{user?.name}</span>
        <button
          onClick={logout}
          className="text-sm text-midnight-400 hover:text-rose-400 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
