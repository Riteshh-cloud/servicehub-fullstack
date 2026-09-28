import { Router } from "express";
import {
  createBooking, myBookings, getBooking, cancelBooking
} from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);
router.post("/", createBooking);
router.get("/my", myBookings);
router.get("/:id", getBooking);
router.patch("/:id/cancel", cancelBooking);

export default router;
