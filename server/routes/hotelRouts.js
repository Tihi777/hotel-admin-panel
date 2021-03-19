import express from "express";
import {
  createHotel,
  getHotels,
  updateHotel,
  deleteHotel,
} from "../controllers/hotelController.js";

const router = express.Router();

router.get("/", getHotels);
router.post("/", createHotel);
router.patch("/:id", updateHotel);
router.delete("/:id", deleteHotel);

export default router;
