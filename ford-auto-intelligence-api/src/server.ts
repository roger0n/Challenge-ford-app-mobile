import express from "express";

import cors from "cors";

import vehicleRoutes
from "./routes/vehicleRoutes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/vehicles",
  vehicleRoutes
);

const PORT = 3333;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});