import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight-900 bg-[radial-gradient(ellipse_at_center,_#161a29_0%,_#0c0e17_70%)] px-4">
      <div className="w-full max-w-sm animate-slide-up">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">₹ Treasury</h1>
          <p className="text-midnight-400 text-sm mt-1">Create your account</p>
        </div>
        <form onSubmit={handleSubmit} className="card space-y-4">
          <h2 className="font-display text-lg font-semibold text-midnight-100">Register</h2>
          {error && <p className="text-rose-400 text-sm">{error}</p>}
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="input-field" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" required />
          <button type="submit" className="btn-primary">Create Account</button>
          <p className="text-center text-xs text-midnight-400">
            Already have an account?{" "}
            <Link to="/login" className="text-gold-400 hover:text-gold-300 transition-colors">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
