// take in eth address and return address sliced 6 characters from the beginning and 4 characters from the end
export const formatAddress = (address) => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const formatBalance = (balance, contract_decimals) => {
  // return number with commas and 5 decimal places
  return (balance / 10 ** contract_decimals).toFixed(5);
};

// take in number and return number with commas and 2 decimal places
export const formatNumber = (number) => {
  return number.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

export const calculateEndDate = (years) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const endYear = currentYear + years;
  const endDate = new Date(endYear, 11, 31); // December 31st of the end year
  const endYearString = endDate.getFullYear().toString(); // Convert the end year to a string
  return endYearString;
}

