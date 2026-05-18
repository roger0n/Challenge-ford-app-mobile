import * as XLSX from "xlsx";

import fs from "fs";

const workbook = XLSX.readFile(
  "src/data/FIAP-Ford - Data sheet_Desafio_01_v02.xlsx"
);

const sheetName = workbook.SheetNames[0];

const worksheet = workbook.Sheets[sheetName];

const data = XLSX.utils.sheet_to_json(worksheet);

fs.writeFileSync(
  "src/data/vehicles.json",

  JSON.stringify(data, null, 2)
);

console.log("Excel convertido para JSON!");