import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.models.Hotel || mongoose.model("Hotel", HotelSchema);
