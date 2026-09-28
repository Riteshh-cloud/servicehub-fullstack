import { CalendarDays, Clock3, MapPin, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api";

const statuses = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled"
};

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const { data } = await api.get("/bookings/my");
      setBookings(data.bookings);
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function cancel(id) {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await api.patch(`/bookings/${id}/cancel`);
      toast.success("Booking cancelled");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to cancel");
    }
  }

  return (
    <main className="page">
      <div className="container">
        <div className="page-heading compact"><span className="eyebrow">Your activity</span><h1>My Bookings</h1><p>Track every appointment in one place.</p></div>

        {loading ? <div className="empty-state">Loading bookings...</div> : bookings.length ? (
          <div className="booking-list">
            {bookings.map((b) => (
              <article className="booking-card" key={b._id}>
                <img src={b.service?.image} alt="" />
                <div className="booking-main">
                  <div className="booking-title-row">
                    <div><span className="category-pill static">{b.service?.category}</span><h3>{b.service?.title}</h3></div>
                    <span className={`status status-${b.status}`}>{statuses[b.status]}</span>
                  </div>
                  <div className="booking-details">
                    <span><CalendarDays size={16} /> {new Date(b.bookingDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span><Clock3 size={16} /> {b.bookingTime}</span>
                    <span><MapPin size={16} /> {b.service?.location}</span>
                  </div>
                  <div className="booking-bottom">
                    <strong>₹{b.totalPrice.toLocaleString("en-IN")}</strong>
                    {["pending", "confirmed"].includes(b.status) && (
                      <button className="danger-button" onClick={() => cancel(b._id)}><XCircle size={15} /> Cancel</button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state"><h3>No bookings yet</h3><p>Explore services and make your first booking.</p></div>
        )}
      </div>
    </main>
  );
}
