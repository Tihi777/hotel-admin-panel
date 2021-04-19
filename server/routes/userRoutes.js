import express from "express";
import { authEmployee } from "../controllers/userController.js";

const router = express.Router();

router.post("/", authEmployee);

export default router;
