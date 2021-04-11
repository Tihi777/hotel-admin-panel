import mongoose from "mongoose";

const roomTypeSchema = mongoose.Schema({
  numberOfRooms: {
    type: Number,
    required: true,
  },
  numberOfBeds: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model("RoomType", roomTypeSchema);
