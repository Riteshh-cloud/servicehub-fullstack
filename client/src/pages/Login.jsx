import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const user = await login(email, password);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}`);
      navigate(user.role === "admin" ? "/admin" : (location.state?.from || "/services"));
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally { setBusy(false); }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">Welcome back</span>
        <h1>Sign in to ServiceHub</h1>
        <p>Manage your services and bookings from one account.</p>
        <form onSubmit={submit} className="form-stack">
          <label>Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></label>
          <label>Password<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" /></label>
          <button className="primary-button full" disabled={busy}>{busy ? "Signing in..." : "Sign In"}</button>
        </form>
        <p className="auth-footer">Don't have an account? <Link to="/register">Create one</Link></p>
      </div>
    </main>
  );
}
