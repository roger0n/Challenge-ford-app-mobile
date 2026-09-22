import "dotenv/config";
import express from "express";

import cors from "cors";

import aiRoutes from "./routes/ai.routes";

import vehicleRoutes from "./routes/vehicleRoutes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/vehicles",
  vehicleRoutes
);

app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});