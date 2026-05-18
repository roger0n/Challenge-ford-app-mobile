import { Router }
from "express";

import {

  getVehicles,

  getVehicleById,

  compareVehicles

} from "../controllers/vehicleController";

const router = Router();

router.get(
  "/",
  getVehicles
);

router.post(
  "/compare",
  compareVehicles
);

router.get(
  "/:id",
  getVehicleById
);

router.get("/:id", getVehicleById);

export default router;