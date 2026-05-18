import vehiclesData from "../data/vehicles.json";

import { Vehicle }
from "../types/vehicle";

export function transformVehicles(): Vehicle[] {

  const versions = Object.keys(
    vehiclesData[0]
  );

  const vehicleVersions = versions.filter(
    (item) => item !== " Equipamentos "
  );

  const transformedVehicles =
    vehicleVersions.map(
      (version, index) => {

        const specifications:
          Record<string, any> = {};

        vehiclesData.forEach((row: any) => {

          const equipment =
            row[" Equipamentos "]?.trim();

          if (
            equipment &&
            equipment !== "Engine & Transmission"
          ) {

            specifications[equipment] =
              row[version];
          }
        });

        return {
          id: index,
          brand: "Ford",
          model: "Ranger",
          version,
          specifications
        };
      }
    );

  return transformedVehicles;
}