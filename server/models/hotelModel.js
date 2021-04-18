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
  rooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  }],
  numberOfRooms: {
    type: Number,
    default: function() {
      return this.rooms.length;
    },
  },
});

export default mongoose.model("Hotel", hotelSchema);
