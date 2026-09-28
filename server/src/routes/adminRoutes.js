import { Router } from "express";
import { dashboard, users, bookings, updateBookingStatus } from "../controllers/adminController.js";
import { protect, requireRole } from "../middleware/auth.js";

const router = Router();
router.use(protect, requireRole("admin"));

router.get("/dashboard", dashboard);
router.get("/users", users);
router.get("/bookings", bookings);
router.patch("/bookings/:id/status", updateBookingStatus);

export default router;
