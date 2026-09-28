import { ArrowUpRight, Clock3, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <div className="service-image-wrap">
        <img src={service.image} alt={service.title} className="service-image" />
        <span className="category-pill">{service.category}</span>
      </div>

      <div className="service-body">
        <div className="service-rating">
          <Star size={15} fill="currentColor" />
          {service.rating?.toFixed(1) || "4.8"}
        </div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>

        <div className="service-meta">
          <span><Clock3 size={15} /> {service.duration} min</span>
          <span><MapPin size={15} /> {service.location}</span>
        </div>

        <div className="service-footer">
          <div>
            <small>Starting from</small>
            <strong>₹{service.price.toLocaleString("en-IN")}</strong>
          </div>
          <Link to={`/services/${service._id}`} className="round-arrow">
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
    </article>
  );
}
