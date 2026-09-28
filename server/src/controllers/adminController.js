import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Service from "../models/Service.js";

export async function dashboard(req, res) {
  const [users, services, bookings, revenueAgg, statuses] = await Promise.all([
    User.countDocuments({ role: "user" }),
    Service.countDocuments(),
    Booking.countDocuments(),
    Booking.aggregate([
      { $match: { status: { $in: ["confirmed", "completed"] } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]),
    Booking.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])
  ]);

  const statusCounts = Object.fromEntries(statuses.map((s) => [s._id, s.count]));

  res.json({
    stats: {
      users,
      services,
      bookings,
      revenue: revenueAgg[0]?.total || 0,
      pending: statusCounts.pending || 0,
      confirmed: statusCounts.confirmed || 0,
      completed: statusCounts.completed || 0,
      cancelled: statusCounts.cancelled || 0
    }
  });
}

export async function users(req, res) {
  const users = await User.find({ role: "user" }).select("-password").sort({ createdAt: -1 });
  res.json({ users });
}

export async function bookings(req, res) {
  const bookings = await Booking.find()
    .populate("user", "name email phone")
    .populate("service", "title category price providerName")
    .sort({ createdAt: -1 });

  res.json({ bookings });
}

export async function updateBookingStatus(req, res) {
  const allowed = ["pending", "confirmed", "completed", "cancelled"];
  if (!allowed.includes(req.body.status)) {
    return res.status(400).json({ message: "Invalid booking status" });
  }

  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  ).populate("user", "name email").populate("service", "title price");

  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json({ booking });
}
