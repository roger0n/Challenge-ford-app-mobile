import { Request, Response }
from "express";

import { transformVehicles }
from "../services/transformVehicles";

const vehicles =
  transformVehicles();

export function getVehicles(
  req: Request,
  res: Response
) {

  const simplifiedVehicles =
    vehicles.map((vehicle) => ({

      id: vehicle.id,

      version: vehicle.version,

      specifications:
        vehicle.specifications
    }));

  return res.json(
    simplifiedVehicles
  );
}

export const getVehicleById = (
  req: Request,
  res: Response
) => {

  const id = Number(req.params.id);

  const vehicle =
    vehicles.find(
      (v) => v.id === id
    );

  if (!vehicle) {

    return res.status(404).json({
      message: "Vehicle not found"
    });
  }

  res.json(vehicle);
}

export function compareVehicles(
  req: Request,
  res: Response
) {

  const { vehiclesIds } =
    req.body;

  const selectedVehicles =
    vehicles.filter((vehicle) =>
      vehiclesIds.includes(vehicle.id)
    );

  return res.json(
    selectedVehicles
  );

  
}