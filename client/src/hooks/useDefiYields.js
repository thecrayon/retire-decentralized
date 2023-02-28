
import React, { useEffect, useState } from 'react';

const useDefiYields = () => {
    const [yieldOptions, setYieldOptions] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const fetchDefiYieldOptions = async () =>
    {
        console.log("heredfds")
        setLoading(true);

       const result = await fetch("https://yields.llama.fi/pools")
       const response = await result.json();

       return response;

    };
    return {
        // data and functions
        yieldOptions,
        fetchDefiYieldOptions,
        loading,
    };
};

export default useDefiYields;