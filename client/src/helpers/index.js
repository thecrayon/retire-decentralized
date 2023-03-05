const ethers = require('ethers');

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

export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // add 1 day to date to account for timezone difference
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate.toLocaleDateString('en-US', options);
};

export const isNewTransaction = (date) => {
  const currentDate = new Date();
  const transactionDate = new Date(date);
  const diffTime = Math.abs(currentDate - transactionDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // return true if transaction is less than 6 hours old // TODO: change to <1 day after hackathon
  return diffDays <= 0.25;
};

// decode log data from transaction (address, address, ether)
export const decodeDepositData = (data) => {
  const decodedData = ethers.utils.defaultAbiCoder.decode(
    ['address', 'address', 'uint256'],
    data
  );
  return decodedData;
};

 // function to convert big number to decimal
 export const convertToDecimal = (amount) => {
  return amount / 1000000000000000000;
};

// take in utc time (military time) string and convert to local time
export const convertToLocalTime = (utcTimeString) => {
  const utcDate = new Date(utcTimeString);
  const localDate = utcDate.toLocaleString();
  return localDate;
}

