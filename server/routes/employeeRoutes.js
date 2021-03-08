import express from "express";
import { authEmployee } from "../controllers/employeeController.js";

const router = express.Router();

router.post("/login", authEmployee);
router.post("/signup", () => {});

export default router;
