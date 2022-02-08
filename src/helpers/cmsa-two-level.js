//
import { uniqueRow, round } from "./utils";

// ///////////
const findByCountry = (data, country) => {
  const result = data.filter(
    (row) => row.country.trim().toLowerCase() === country.trim().toLowerCase()
  );
  if (result.length !== 0) return result;
  return { value: -1, message: "COUNTRY NOT FOUND" };
};
// ///////////

// ///////////
const findByComReg = (data, comReg, col = "commodity") => {
  const result = data.filter(
    (row) => row[col].trim().toLowerCase() === comReg.trim().toLowerCase()
  );
  if (result.length !== 0) return result[0];
  return { value: -1, message: "COMMODITY NOT FOUND" };
};
// ///////////

// ///////////
const totalExport = (data, year) => {
  let total = 0;
  for (let row of data) {
    total += parseFloat(row[year]);
  }
  return total;
};
// ///////////

// ///////////
const growthRate = (data, baseYear, year) => {
  const baseYearExport = totalExport(data, baseYear);
  const yearExport = totalExport(data, year);
  return (yearExport - baseYearExport) / baseYearExport;
};
// ///////////

// ///////////
const growthRateRow = (dataRow, baseYear, year) => {
  return (dataRow[year] - dataRow[baseYear]) / dataRow[baseYear];
};
// ///////////

// ///////////
export const worldGrowthEffect = (
  data,
  worldCol = "World",
  countryCol = "Country",
  baseYear,
  year
) => {
  const worldData = findByCountry(data, worldCol);
  const countryRows = findByCountry(data, countryCol);
  const worldGr = growthRate(worldData, baseYear, year);
  const baseCountry = totalExport(countryRows, baseYear);
  return worldGr * baseCountry;
};
// ///////////

// ///////////
export const comRegEffect = (
  data,
  comReg = [],
  worldName = "World",
  countryName = "country",
  baseYear,
  isCommodity = true,
  year
) => {
  const worldData = findByCountry(data, worldName);
  const countryData = findByCountry(data, countryName);
  const worldGrowthRate = growthRate(worldData, baseYear, year);
  let result = 0;
  // console.log(findByComReg(countryData, "A", "commodity"));
  for (let row of worldData) {
    const isExist = isCommodity
      ? comReg.some(
          (commodity) => commodity === row.commodity.trim().toLowerCase()
        )
      : comReg.some((region) => region === row.region.trim().toLowerCase());
    if (isExist) {
      const rowCountry = isCommodity
        ? findByComReg(countryData, row.commodity, "commodity")
        : findByComReg(countryData, row.region, "region");
      result +=
        (growthRateRow(row, baseYear, year) - worldGrowthRate) *
        rowCountry[baseYear];
    }
  }
  return result;
};
// ///////////

// ///////////
export const competitivenessEffect = (
  data,
  worldName = "World",
  countryName = "country",
  baseYear,
  isCommodity,
  year
) => {
  const worldData = findByCountry(data, worldName);
  const countryData = findByCountry(data, countryName);
  let result = 0;
  for (let rowCountry of countryData) {
    const rowWorld = isCommodity
      ? findByComReg(worldData, rowCountry.commodity, "commodity")
      : findByComReg(worldData, rowCountry.region, "region");
    const countryRowGrowth = growthRateRow(rowCountry, baseYear, year);
    const worldRowGrowth = growthRateRow(rowWorld, baseYear, year);
    result += (countryRowGrowth - worldRowGrowth) * rowCountry[baseYear];
  }
  return result;
};
// ///////////

// FINAL
// //////////
export const two_level = (
  data,
  worldName = "World",
  countryName = "country",
  baseYear,
  year,
  isCommodity
) => {
  const countryData = findByCountry(data, countryName);
  const com_reg = isCommodity
    ? uniqueRow(countryData, "commodity")
    : uniqueRow(countryData, "region");
  const WGE = round(
    worldGrowthEffect(data, worldName, countryName, baseYear, year)
  );
  const C_RE = round(
    comRegEffect(
      data,
      com_reg,
      worldName,
      countryName,
      baseYear,
      isCommodity,
      year
    )
  );
  const COMPE_EFFECT = round(
    competitivenessEffect(
      data,
      worldName,
      countryName,
      baseYear,
      isCommodity,
      year
    )
  );
  if (isCommodity)
    return {
      country: countryName,
      "World Growth Effect": WGE,
      "Commodity Effect": C_RE,
      "Competitiveness Effect": COMPE_EFFECT,
    };
  else
    return {
      country: countryName,
      "World Growth Effect": WGE,
      "Region Effect": C_RE,
      "Competitiveness Effect": COMPE_EFFECT,
    };
};
// //////////

// THE TRUE FINAL
// /////////
export const two_level_all = (
  data,
  worldName = "World",
  countryList = [],
  baseYear,
  year,
  isCommodity
) => {
  const result = [];
  for (let country of countryList) {
    if (country === worldName.toLowerCase()) continue;
    const temp = two_level(
      data,
      worldName,
      country,
      baseYear,
      year,
      isCommodity
    );
    result.push(temp);
  }
  if (isCommodity)
    result.columns = [
      { Header: "country", accessor: "country" },
      { Header: "World Growth Effect", accessor: "World Growth Effect" },
      { Header: "Commodity Effect", accessor: "Commodity Effect" },
      { Header: "Competitiveness Effect", accessor: "Competitiveness Effect" },
    ];
  else
    result.columns = [
      { Header: "country", accessor: "country" },
      { Header: "World Growth Effect", accessor: "World Growth Effect" },
      { Header: "Region Effect", accessor: "Region Effect" },
      { Header: "Competitiveness Effect", accessor: "Competitiveness Effect" },
    ];
  return result;
};
// /////////
