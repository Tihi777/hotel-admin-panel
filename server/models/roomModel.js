import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  floor: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  roomType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "RoomType",
  },
  hotelName: {
    type: String,
    required: true,
  },
  hotelId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Room", roomSchema);
