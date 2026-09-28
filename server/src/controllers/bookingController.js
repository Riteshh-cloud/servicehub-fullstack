import Booking from "../models/Booking.js";
import Service from "../models/Service.js";

export async function createBooking(req, res) {
  const { serviceId, bookingDate, bookingTime, notes = "" } = req.body;
  const service = await Service.findOne({ _id: serviceId, active: true });

  if (!service) return res.status(404).json({ message: "Service not found" });
  if (!service.slots.includes(bookingTime)) {
    return res.status(400).json({ message: "Selected time is not available" });
  }

  const date = new Date(bookingDate);
  if (Number.isNaN(date.getTime()) || date < new Date(new Date().setHours(0,0,0,0))) {
    return res.status(400).json({ message: "Please select a valid future date" });
  }

  const existing = await Booking.findOne({
    service: serviceId,
    bookingDate: date,
    bookingTime,
    status: { $in: ["pending", "confirmed"] }
  });

  if (existing) return res.status(409).json({ message: "That slot has already been booked" });

  const booking = await Booking.create({
    user: req.user._id,
    service: serviceId,
    bookingDate: date,
    bookingTime,
    notes,
    totalPrice: service.price
  });

  await booking.populate("service", "title category price duration image providerName location");
  res.status(201).json({ booking });
}

export async function myBookings(req, res) {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("service", "title category price duration image providerName location")
    .sort({ bookingDate: -1, createdAt: -1 });

  res.json({ bookings });
}

export async function getBooking(req, res) {
  const booking = await Booking.findOne({
    _id: req.params.id,
    user: req.user._id
  }).populate("service");

  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json({ booking });
}

export async function cancelBooking(req, res) {
  const booking = await Booking.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id, status: { $in: ["pending", "confirmed"] } },
    { status: "cancelled" },
    { new: true }
  );

  if (!booking) return res.status(404).json({ message: "Booking cannot be cancelled" });
  res.json({ booking });
}
