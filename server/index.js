import express from "express";
import connectDatabase from "./config/database.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import colors from "colors";

import employeeRoutes from "./routes/employeeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import employeePositionRoutes from "./routes/employeePositionRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import roomTypeRoutes from "./routes/roomTypeRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import guestRoutes from "./routes/guestsRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "5mb" }));
app.use(cors());

app.use("/api/login", userRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/employee/positions", employeePositionRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/rooms/", roomRoutes);
app.use("/api/room/types", roomTypeRoutes);

app.use(notFound);
app.use(errorHandler);

connectDatabase().then(() =>
  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
        .bold
    );
  })
);
