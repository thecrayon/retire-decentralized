import { useState } from "react";

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState("");

  const fetchTransactions = async (address) => {
    setLoading(true);

    // TODO: remove api key from code
    const result = await fetch(
      `https://api.covalenthq.com/v1/avalanche-testnet/address/${address}/transactions_v3/?key=${process.env.REACT_APP_COVALENT_API_KEY}`
    );
    const response = await result.json();
    setTransactions(response.data.items);

    setLoading(false);

    return response;
  };

  return {
    // data and functions
    transactions,
    fetchTransactions,
    loading,
  };
};

export default useTransactions;
