import { Link, NavLink, useNavigate } from "react-router-dom";
import { CalendarDays, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">S</span>
          <span>ServiceHub</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/services">Services</NavLink>
          {user && <NavLink to="/bookings">My Bookings</NavLink>}
          {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
        </nav>

        <div className="nav-actions">
          {user ? (
            <>
              <Link className="icon-link" to="/profile" title="Profile">
                <UserRound size={18} />
                <span>{user.name.split(" ")[0]}</span>
              </Link>
              <button className="ghost-button" onClick={handleLogout}>
                <LogOut size={17} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link className="ghost-button" to="/login">Login</Link>
              <Link className="primary-button small" to="/register">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
