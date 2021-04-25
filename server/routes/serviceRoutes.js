import express from "express";
import {
  getServices,
  createService,
  deleteService,
  updateService,
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", getServices);
router.post("/", createService);
router.patch("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
