import { CalendarDays, Clock3, MapPin, ShieldCheck, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function ServiceDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.get(`/services/${id}`).then(({ data }) => setService(data.service)).catch(() => setService(false));
  }, [id]);

  if (service === false) return <main className="page"><div className="container empty-state"><h2>Service not found</h2></div></main>;
  if (!service) return <div className="page-loader">Loading service...</div>;

  async function book() {
    if (!user) return navigate("/login", { state: { from: `/services/${id}` } });
    if (!date || !time) return toast.error("Choose a date and time slot");
    setBusy(true);
    try {
      await api.post("/bookings", { serviceId: id, bookingDate: date, bookingTime: time, notes });
      toast.success("Booking request created");
      navigate("/bookings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to create booking");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="page">
      <div className="container">
        <Link className="back-link" to="/services">← Back to services</Link>
        <div className="detail-grid">
          <div>
            <img className="detail-image" src={service.image} alt={service.title} />
            <div className="detail-content">
              <div className="service-rating"><Star size={15} fill="currentColor" /> {service.rating?.toFixed(1)}</div>
              <span className="category-pill static">{service.category}</span>
              <h1>{service.title}</h1>
              <p className="large-copy">{service.description}</p>
              <div className="detail-meta">
                <span><Clock3 /> {service.duration} minutes</span>
                <span><MapPin /> {service.location}</span>
                <span><ShieldCheck /> {service.providerName}</span>
              </div>
            </div>
          </div>

          <aside className="booking-panel">
            <div className="booking-price">
              <small>Service price</small>
              <strong>₹{service.price.toLocaleString("en-IN")}</strong>
            </div>

            <label>Date</label>
            <div className="date-input"><CalendarDays size={18} /><input type="date" min={new Date().toISOString().slice(0,10)} value={date} onChange={(e) => setDate(e.target.value)} /></div>

            <label>Available time</label>
            <div className="slot-grid">
              {service.slots.map((slot) => (
                <button key={slot} className={time === slot ? "slot active" : "slot"} onClick={() => setTime(slot)}>{slot}</button>
              ))}
            </div>

            <label>Notes <span>(optional)</span></label>
            <textarea rows="3" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything the provider should know?" />

            <button className="primary-button full" onClick={book} disabled={busy}>
              {busy ? "Booking..." : user ? "Book Service" : "Login to Book"}
            </button>
            <small className="secure-note"><ShieldCheck size={14} /> Secure booking · No payment is collected here</small>
          </aside>
        </div>
      </div>
    </main>
  );
}
