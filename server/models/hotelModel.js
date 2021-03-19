import mongoose from "mongoose";

const hotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  score: {
    type: Number,
    default: 4.5,
  },
  numberOfRooms: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Hotel", hotelSchema);
