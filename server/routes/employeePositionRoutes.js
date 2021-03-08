import express from "express";
import {
  createEmployeePosition,
  getEmployeePositions,
  updateEmployeePosition,
  deleteEmployeePosition,
} from "../controllers/employeePositionController.js";

const router = express.Router();

router.get("/", getEmployeePositions);
router.post("/", createEmployeePosition);
router.patch("/:id", updateEmployeePosition);
router.delete("/:id", deleteEmployeePosition);

export default router;
