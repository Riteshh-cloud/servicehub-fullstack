import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [busy, setBusy] = useState(false);

  function change(e) { setForm((f) => ({ ...f, [e.target.name]: e.target.value })); }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      await register(form);
      toast.success("Account created");
      navigate("/services");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally { setBusy(false); }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">Get started</span>
        <h1>Create your ServiceHub account</h1>
        <p>Book services, manage appointments and keep everything organized.</p>
        <form onSubmit={submit} className="form-stack">
          <label>Full name<input name="name" required value={form.name} onChange={change} placeholder="Your name" /></label>
          <label>Email<input name="email" type="email" required value={form.email} onChange={change} placeholder="you@example.com" /></label>
          <label>Phone<input name="phone" value={form.phone} onChange={change} placeholder="+91..." /></label>
          <label>Password<input name="password" type="password" minLength="8" required value={form.password} onChange={change} placeholder="Minimum 8 characters" /></label>
          <button className="primary-button full" disabled={busy}>{busy ? "Creating..." : "Create Account"}</button>
        </form>
        <p className="auth-footer">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </main>
  );
}
