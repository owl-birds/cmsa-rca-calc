// costum func
import { round } from "./utils.js";

// FIX FUNCTION
// /////////////
const growthRate = (rowData, baseYear, year) => {
  const first = findByYear(rowData, baseYear);
  const second = findByYear(rowData, year);
  return (second - first) / first;
};
// ////////////
// //////////////
const findRowByCountry = (data, country) => {
  for (let row of data) {
    if (country.trim().toLowerCase() === row.country.trim().toLowerCase())
      return row;
  }
  return "COUNTRY NOT FOUND";
};
// ////////////
// /////////////
const findByYear = (row, year) => {
  let value;
  Object.keys(row).map((key) => {
    //   console.log(key);
    //   console.log(row[key]);
    if (key === year) {
      value = row[key];
    }
  });
  return value;
};
// ////////////////////////
// ////////////////////////////////////////
export const worldGrowthEffect = (
  worldCol = "world",
  countryCol = "country",
  data,
  baseYear,
  year
) => {
  const worldRow = findRowByCountry(data, worldCol);
  const countryRow = findRowByCountry(data, countryCol);
  const worldGrowth = growthRate(worldRow, baseYear, year);
  const baseExCountry = findByYear(countryRow, baseYear);
  return worldGrowth * baseExCountry;
};
// /////////////////////////////////////////
// /////////////////////
export const competitivenessEffect = (
  worldCol = "world",
  countryCol = "country",
  data,
  baseYear,
  year
) => {
  const worldRow = findRowByCountry(data, worldCol);
  const countryRow = findRowByCountry(data, countryCol);
  const worldGrowth = growthRate(worldRow, baseYear, year);
  const countryGrowth = growthRate(countryRow, baseYear, year);
  const baseExCountry = findByYear(countryRow, baseYear);
  return (countryGrowth - worldGrowth) * baseExCountry;
};
// ////////////////////
// ////////////////////
export const one_level = (
  worldCol = "world",
  countryCol = "country",
  data,
  baseYear,
  year
) => {
  const worldRow = findRowByCountry(data, worldCol);
  const countryRow = findRowByCountry(data, countryCol);
  const worldGrowth = growthRate(worldRow, baseYear, year);
  const baseExCountry = findByYear(countryRow, baseYear);
  const countryGrowth = growthRate(countryRow, baseYear, year);
  const temp = [
    {
      country: countryCol.trim().toLowerCase(),
      "World Growth Effect": round(worldGrowth * baseExCountry),
      "Competitiveness Effect": round(
        (countryGrowth - worldGrowth) * baseExCountry
      ),
    },
  ];
  temp.columns = [
    { Header: "country", accessor: "country" },
    { Header: "World Growth Effect", accessor: "World Growth Effect" },
    { Header: "Competitiveness Effect", accessor: "Competitiveness Effect" },
  ];
  return temp;
};
// //////////////////////
// //////////////////////
const one_level_row = (
  worldCol = "world",
  countryCol = "country",
  data,
  baseYear,
  year
) => {
  const worldRow = findRowByCountry(data, worldCol);
  const countryRow = findRowByCountry(data, countryCol);
  const worldGrowth = growthRate(worldRow, baseYear, year);
  const baseExCountry = findByYear(countryRow, baseYear);
  const countryGrowth = growthRate(countryRow, baseYear, year);
  return {
    country: countryCol.trim().toLowerCase(),
    "World Growth Effect": round(worldGrowth * baseExCountry),
    "Competitiveness Effect": round(
      (countryGrowth - worldGrowth) * baseExCountry
    ),
  };
};
// //////////////////////
// //////////////////////
export const one_level_all = (
  worldCol = "world",
  countryList,
  data,
  baseYear,
  year
) => {
  const result = [];
  for (let country of countryList) {
    if (country === worldCol.trim().toLowerCase()) {
      continue;
    }
    const temp = one_level_row(worldCol, country, data, baseYear, year);
    result.push(temp);
  }
  result.columns = [
    { Header: "country", accessor: "country" },
    { Header: "World Growth Effect", accessor: "World Growth Effect" },
    { Header: "Competitiveness Effect", accessor: "Competitiveness Effect" },
  ];
  return result;
};
// //////////////////////
