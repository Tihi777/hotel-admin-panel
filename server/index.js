import express from "express";
import connectDatabase from "./config/database.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import colors from "colors";

import employeeRoutes from "./routes/employeeRoutes.js";
import employeePositionRoutes from "./routes/employeePositionRoutes.js";
import hotelRouts from "./routes/hotelRoutes.js";
import roomTypeRouts from "./routes/roomTypeRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/api/employee", employeeRoutes);
app.use("/api/employee/positions", employeePositionRoutes);
app.use("/api/hotel", hotelRouts);
app.use("/api/room/types", roomTypeRouts);

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
