import express from "express";
import {
  getGuests,
  createGuest,
  deleteGuest,
  updateGuest,
} from "../controllers/guestController.js";

const router = express.Router();

router.get("/", getGuests);
router.post("/", createGuest);
router.patch("/:id", updateGuest);
router.delete("/:id", deleteGuest);

export default router;
