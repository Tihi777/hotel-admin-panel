import express from "express";
import {
  getRooms,
  createRoom,
  deleteRoom,
  updateRoom,
} from "../controllers/roomController.js";

const router = express.Router();

router.get("/", getRooms);
router.post("/", createRoom);
router.patch("/:id", updateRoom);
router.delete("/:id", deleteRoom);

export default router;
