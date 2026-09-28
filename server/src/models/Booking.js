import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    bookingDate: { type: Date, required: true },
    bookingTime: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending"
    },
    totalPrice: { type: Number, required: true, min: 0 },
    notes: { type: String, maxlength: 500, default: "" }
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ service: 1, bookingDate: 1, bookingTime: 1 });

export default mongoose.model("Booking", bookingSchema);
