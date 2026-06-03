import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/transactions", label: "Transactions" },
  { to: "/reports", label: "Reports" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-midnight-600/30 bg-midnight-900/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent whitespace-nowrap">
            ₹ Treasury
          </span>
          <div className="hidden sm:flex gap-1">
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

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden sm:inline text-sm text-midnight-300 truncate max-w-[120px]">{user?.name}</span>
          <button onClick={logout} className="hidden sm:inline text-sm text-midnight-400 hover:text-rose-400 transition-colors">
            Logout
          </button>
          <button onClick={() => setOpen(!open)} className="sm:hidden p-2 text-midnight-300 hover:text-midnight-50 transition-colors" aria-label="Toggle menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="sm:hidden border-t border-midnight-600/30 bg-midnight-900/95 backdrop-blur-lg animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? "bg-gold-500/10 text-gold-300" : "text-midnight-200 hover:text-midnight-50 hover:bg-midnight-700/50"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-midnight-600/30 flex items-center justify-between">
            <span className="text-sm text-midnight-300 truncate max-w-[160px]">{user?.name}</span>
            <button onClick={logout} className="text-sm text-midnight-400 hover:text-rose-400 transition-colors">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
