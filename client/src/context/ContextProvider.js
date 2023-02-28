/* eslint-disable */
import React, { createContext, useContext, useEffect, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [defiYieldOptions, setDefiYieldOptions] = useState();

  const getDefiYieldOptions = async () => {
    const result = await fetch("https://yields.llama.fi/pools");
    const response = await result.json();
    console.log(response.data.filter((item) => item.chain === "Ethereum" && item.symbol === "ETH" && item.apyBase !== null && item.apyBase !== 0).slice(0,3))
    return response;
  };

  useEffect(() => {
    getDefiYieldOptions().then((res) => {
      setDefiYieldOptions(res);
    });
  }, [])
  
  return (
    <StateContext.Provider value={{
      defiYieldOptions,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);