import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";
import ServiceCard from "../components/ServiceCard";

const categories = ["All", "Home Services", "Repair", "Technology", "Wellness", "Beauty", "Creative"];

export default function Services() {
  const [params] = useSearchParams();
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("/services", {
      params: {
        search: search || undefined,
        category: category !== "All" ? category : undefined
      }
    }).then(({ data }) => setServices(data.services)).finally(() => setLoading(false));
  }, [search, category]);

  const countLabel = useMemo(() => `${services.length} service${services.length !== 1 ? "s" : ""}`, [services]);

  return (
    <main className="page">
      <div className="container">
        <div className="page-heading">
          <span className="eyebrow">Explore</span>
          <h1>Find a service that fits your needs.</h1>
          <p>Search across trusted categories and book a convenient time.</p>
        </div>

        <div className="filters">
          <div className="search-input">
            <Search size={19} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search services..." />
          </div>
          <div className="filter-label"><SlidersHorizontal size={17} /> Category</div>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="results-bar"><span>{countLabel}</span></div>

        {loading ? (
          <div className="empty-state">Loading services...</div>
        ) : services.length ? (
          <div className="service-grid">{services.map((s) => <ServiceCard key={s._id} service={s} />)}</div>
        ) : (
          <div className="empty-state"><h3>No services found</h3><p>Try another search or category.</p></div>
        )}
      </div>
    </main>
  );
}
