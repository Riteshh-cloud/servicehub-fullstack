import Service from "../models/Service.js";

export async function listServices(req, res) {
  const { search = "", category, minPrice, maxPrice } = req.query;
  const query = { active: true };

  if (search.trim()) {
    query.$text = { $search: search.trim() };
  }
  if (category && category !== "All") query.category = category;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const services = await Service.find(query).sort({ createdAt: -1 });
  res.json({ services });
}

export async function getService(req, res) {
  const service = await Service.findOne({ _id: req.params.id, active: true });
  if (!service) return res.status(404).json({ message: "Service not found" });
  res.json({ service });
}

export async function adminListServices(req, res) {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json({ services });
}

export async function createService(req, res) {
  const service = await Service.create(req.body);
  res.status(201).json({ service });
}

export async function updateService(req, res) {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!service) return res.status(404).json({ message: "Service not found" });
  res.json({ service });
}

export async function deleteService(req, res) {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ message: "Service not found" });
  res.json({ message: "Service deleted" });
}
