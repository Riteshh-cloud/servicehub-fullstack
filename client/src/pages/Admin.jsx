import { BarChart3, CalendarCheck, CheckCircle2, IndianRupee, Package, Users } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import api from "../api";
import StatCard from "../components/StatCard";

const statusOptions = ["pending", "confirmed", "completed", "cancelled"];

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [tab, setTab] = useState("overview");

  async function load() {
    const [d, b, u, s] = await Promise.all([
      api.get("/admin/dashboard"),
      api.get("/admin/bookings"),
      api.get("/admin/users"),
      api.get("/services/admin/all")
    ]);
    setStats(d.data.stats);
    setBookings(b.data.bookings);
    setUsers(u.data.users);
    setServices(s.data.services);
  }

  useEffect(() => { load().catch(() => toast.error("Could not load admin dashboard")); }, []);

  async function updateStatus(id, status) {
    try {
      await api.patch(`/admin/bookings/${id}/status`, { status });
      toast.success("Booking status updated");
      load();
    } catch (err) { toast.error(err.response?.data?.message || "Update failed"); }
  }

  if (!stats) return <div className="page-loader">Loading dashboard...</div>;

  const chart = [
    { name: "Pending", value: stats.pending },
    { name: "Confirmed", value: stats.confirmed },
    { name: "Completed", value: stats.completed },
    { name: "Cancelled", value: stats.cancelled }
  ];

  return (
    <main className="page">
      <div className="container">
        <div className="admin-heading">
          <div><span className="eyebrow">Operations</span><h1>Admin Dashboard</h1><p>Monitor the ServiceHub marketplace.</p></div>
          <div className="admin-tabs">
            {["overview", "bookings", "users", "services"].map((t) => <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>{t}</button>)}
          </div>
        </div>

        <div className="stats-grid">
          <StatCard label="Customers" value={stats.users} icon={Users} />
          <StatCard label="Services" value={stats.services} icon={Package} />
          <StatCard label="Bookings" value={stats.bookings} icon={CalendarCheck} />
          <StatCard label="Recognized revenue" value={`₹${stats.revenue.toLocaleString("en-IN")}`} icon={IndianRupee} />
        </div>

        {tab === "overview" && (
          <div className="admin-grid">
            <div className="panel chart-panel">
              <div className="panel-heading"><div><h2>Booking status</h2><p>Current booking lifecycle</p></div><BarChart3 /></div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="value" /></BarChart>
              </ResponsiveContainer>
            </div>
            <div className="panel">
              <div className="panel-heading"><div><h2>Quick stats</h2><p>Operational snapshot</p></div></div>
              <div className="quick-stats">
                <div><span>Pending</span><strong>{stats.pending}</strong></div>
                <div><span>Confirmed</span><strong>{stats.confirmed}</strong></div>
                <div><span>Completed</span><strong>{stats.completed}</strong></div>
                <div><span>Cancelled</span><strong>{stats.cancelled}</strong></div>
              </div>
            </div>
          </div>
        )}

        {tab === "bookings" && <div className="panel table-panel"><h2>Booking management</h2><div className="table-scroll"><table><thead><tr><th>Customer</th><th>Service</th><th>Date</th><th>Price</th><th>Status</th></tr></thead><tbody>
          {bookings.map((b) => <tr key={b._id}><td><strong>{b.user?.name}</strong><small>{b.user?.email}</small></td><td>{b.service?.title}</td><td>{new Date(b.bookingDate).toLocaleDateString("en-IN")} · {b.bookingTime}</td><td>₹{b.totalPrice.toLocaleString("en-IN")}</td><td><select value={b.status} onChange={(e) => updateStatus(b._id, e.target.value)}>{statusOptions.map((s) => <option key={s}>{s}</option>)}</select></td></tr>)}
        </tbody></table></div></div>}

        {tab === "users" && <div className="panel table-panel"><h2>Customers</h2><div className="table-scroll"><table><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Joined</th></tr></thead><tbody>
          {users.map((u) => <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.phone || "—"}</td><td>{new Date(u.createdAt).toLocaleDateString("en-IN")}</td></tr>)}
        </tbody></table></div></div>}

        {tab === "services" && <div className="panel table-panel"><h2>Services</h2><div className="table-scroll"><table><thead><tr><th>Service</th><th>Category</th><th>Provider</th><th>Price</th><th>State</th></tr></thead><tbody>
          {services.map((s) => <tr key={s._id}><td><strong>{s.title}</strong></td><td>{s.category}</td><td>{s.providerName}</td><td>₹{s.price.toLocaleString("en-IN")}</td><td>{s.active ? "Active" : "Inactive"}</td></tr>)}
        </tbody></table></div></div>}
      </div>
    </main>
  );
}
