import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Service from "./models/Service.js";

const services = [
  {
    title: "Deep Home Cleaning",
    description: "Professional deep cleaning for apartments and homes, including kitchens, bathrooms and living spaces.",
    category: "Home Services",
    price: 1499,
    duration: 120,
    location: "Visakhapatnam",
    providerName: "CleanNest Pro",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "AC Service & Repair",
    description: "AC inspection, cleaning and maintenance by experienced technicians.",
    category: "Repair",
    price: 799,
    duration: 90,
    location: "Visakhapatnam",
    providerName: "CoolCare",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Laptop & PC Repair",
    description: "Diagnostics, operating system setup, hardware service and performance optimization.",
    category: "Technology",
    price: 599,
    duration: 60,
    location: "Visakhapatnam",
    providerName: "TechFix Hub",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc5b3b2?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Personal Fitness Session",
    description: "One-on-one fitness session with a certified trainer tailored to your goals.",
    category: "Wellness",
    price: 999,
    duration: 60,
    location: "Visakhapatnam",
    providerName: "PeakFit Studio",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Salon & Grooming",
    description: "Men's haircut, beard styling and grooming session from an experienced stylist.",
    category: "Beauty",
    price: 699,
    duration: 60,
    location: "Visakhapatnam",
    providerName: "Urban Groom",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Photography Session",
    description: "Portrait or event photography session with edited high-resolution images.",
    category: "Creative",
    price: 2499,
    duration: 120,
    location: "Visakhapatnam",
    providerName: "FrameLab Studio",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80"
  }
];

async function seed() {
  await connectDB();

  const password = await bcrypt.hash("Admin@12345", 12);
  await User.findOneAndUpdate(
    { email: "admin@servicehub.dev" },
    {
      name: "ServiceHub Admin",
      email: "admin@servicehub.dev",
      password,
      role: "admin"
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  if (await Service.countDocuments() === 0) {
    await Service.insertMany(services);
  }

  console.log("Seed completed.");
  console.log("Admin: admin@servicehub.dev / Admin@12345");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
