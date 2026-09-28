import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, maxlength: 2000 },
    category: { type: String, required: true, trim: true, maxlength: 60 },
    price: { type: Number, required: true, min: 0 },
    duration: { type: Number, required: true, min: 15 },
    image: { type: String, default: "" },
    location: { type: String, required: true, maxlength: 160 },
    providerName: { type: String, required: true, maxlength: 120 },
    active: { type: Boolean, default: true },
    rating: { type: Number, default: 4.8, min: 0, max: 5 },
    slots: {
      type: [String],
      default: ["09:00", "10:30", "12:00", "14:00", "16:00", "18:00"]
    }
  },
  { timestamps: true }
);

serviceSchema.index({ title: "text", description: "text", category: "text" });

export default mongoose.model("Service", serviceSchema);
