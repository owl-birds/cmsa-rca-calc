export const uniqueRow = (data, colName) => {
  const temp = [];
  // const isColumnExist = data.columns.some((column) => column === colName);
  // if (!isColumnExist) return -1;
  for (let row of data) {
    const isExist = temp.some(
      (item) => item === row[colName].trim().toLowerCase()
    );
    if (!isExist) temp.push(row[colName].trim().toLowerCase());
  }
  return temp;
};
export const round = (num) => {
  return +(Math.round(num + "e+2") + "e-2");
};
export const uniqueYear = (data) => {
  return Object.keys(data[0]).filter(
    (col) => col !== "country" && col !== "commodity" && col !== "region"
  );
};
export const editCell = (
  data = [],
  editedValue,
  index = Number,
  columnName
) => {
  const temp = data.map((row) => {
    return { ...row };
  });
  temp.columns = data.columns;
  temp[index][columnName] = editedValue;
  return temp;
};
