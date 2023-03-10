
import { useState } from 'react';

const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const fetchTransactions = async (address) =>
    {
        setLoading(true);

        console.log("key", process.env.REACT_APP_COVALENT_API_KEY)

        // TODO: remove api key from code
        const result = await fetch(`https://api.covalenthq.com/v1/avalanche-testnet/address/${address}/transactions_v3/?key=${process.env.REACT_APP_COVALENT_API_KEY}`);
        const response = await result.json();
        console.log(response)
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