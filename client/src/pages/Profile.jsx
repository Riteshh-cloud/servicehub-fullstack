import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return (
    <main className="page">
      <div className="container narrow">
        <div className="page-heading compact"><span className="eyebrow">Account</span><h1>Your Profile</h1></div>
        <div className="profile-card">
          <div className="profile-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          <div className="profile-info">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <p>{user?.phone || "No phone number added"}</p>
            <span className="role-badge">{user?.role}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
