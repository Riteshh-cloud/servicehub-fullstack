import { ArrowRight, CheckCircle2, Search, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import ServiceCard from "../components/ServiceCard";

const categories = ["Home Services", "Repair", "Technology", "Wellness", "Beauty", "Creative"];

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get("/services").then(({ data }) => setFeatured(data.services.slice(0, 3)));
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="hero-glow" />
        <div className="container hero-grid">
          <div>
            <span className="eyebrow"><Sparkles size={15} /> Trusted services, simpler booking</span>
            <h1>Book the right service.<br /><em>Right when you need it.</em></h1>
            <p className="hero-copy">
              Discover reliable local professionals, compare services, choose your preferred slot,
              and manage every booking from one place.
            </p>

            <div className="hero-actions">
              <Link className="primary-button" to="/services">Explore Services <ArrowRight size={18} /></Link>
              <Link className="secondary-button" to="/register">Create Account</Link>
            </div>

            <div className="trust-row">
              <span><CheckCircle2 size={17} /> Verified providers</span>
              <span><ShieldCheck size={17} /> Secure booking</span>
              <span><Zap size={17} /> Fast confirmation</span>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-top">
              <span>What are you looking for?</span>
              <span className="live-dot">Live</span>
            </div>
            <Link to="/services" className="search-box">
              <Search size={20} />
              <span>Search cleaning, repair, fitness...</span>
              <ArrowRight size={18} />
            </Link>
            <div className="hero-categories">
              {categories.slice(0, 4).map((c) => <Link key={c} to={`/services?category=${encodeURIComponent(c)}`}>{c}</Link>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Popular right now</span>
              <h2>Services people book</h2>
            </div>
            <Link className="text-link" to="/services">View all <ArrowRight size={16} /></Link>
          </div>

          <div className="service-grid">
            {featured.map((service) => <ServiceCard key={service._id} service={service} />)}
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container feature-grid">
          <div>
            <span className="eyebrow">Built for convenience</span>
            <h2>Everything you need from discovery to completion.</h2>
            <p>ServiceHub keeps the entire booking lifecycle clear, fast and organized.</p>
          </div>
          <div className="feature-list">
            <div><ShieldCheck /><div><strong>Secure by design</strong><p>JWT authentication, password hashing and role-based access.</p></div></div>
            <div><CalendarDays /><div><strong>Flexible scheduling</strong><p>Select a date and available time slot that works for you.</p></div></div>
            <div><CheckCircle2 /><div><strong>Transparent status</strong><p>Track pending, confirmed, completed and cancelled bookings.</p></div></div>
          </div>
        </div>
      </section>
    </main>
  );
}
