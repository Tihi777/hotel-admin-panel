import express from "express";
import {
  getRoomTypes,
  createRoomType,
  deleteRoomType,
  updateRoomType,
} from "../controllers/roomTypeController.js";

const router = express.Router();

router.get("/", getRoomTypes);
router.post("/", createRoomType);
router.patch("/:id", updateRoomType);
router.delete("/:id", deleteRoomType);

export default router;
