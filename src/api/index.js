import { csvParse } from "d3-dsv";
export const readCSV = (stringData) => csvParse(stringData);
