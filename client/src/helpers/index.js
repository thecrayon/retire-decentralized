// take in eth address and return address sliced 6 characters from the beginning and 4 characters from the end
export const formatAddress = (address) => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};