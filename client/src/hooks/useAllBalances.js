
import { useState } from 'react';

const useAllBalances = () => {
    const [balances, setBalances] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const fetchMyTokenBalances = async (address) =>
    {
        setLoading(true);

        // TODO: remove api key from code
        const result = await fetch(`https://api.covalenthq.com/v1/eth-mainnet/address/${address}/balances_v2/?key=ckey_318b083d70e14a0199369b944e5`);
        const response = await result.json();
        setBalances(response.data.items);

        setLoading(false);
        
        return response;
    };

    return {
        // data and functions
        balances,
        fetchMyTokenBalances,
        loading,
    };
};

export default useAllBalances;