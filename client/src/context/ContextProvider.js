/* eslint-disable */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAccount, useNetwork } from "wagmi";

import useAllBalances from '../hooks/useAllBalances';
import { CONSTANTS } from '../constants';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  // all defi yield options from llama.fi
  const [defiYieldOptions, setDefiYieldOptions] = useState();
  // user token balances
  const [userTokenBalances, setUserTokenBalances] = useState([]);
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);

  // WAGMI hooks
  const { address } = useAccount();
  const { fetchMyTokenBalances } = useAllBalances();
  const {chain} = useNetwork();

  const { llamaFiURL } = CONSTANTS;

  const getDefiYieldOptions = async () => {
    const result = await fetch(llamaFiURL);
    const response = await result.json();
    console.log(response.data.filter((item) => item.chain === "Ethereum" && item.symbol === "ETH" && item.apyBase !== null && item.apyBase !== 0).slice(0,3))
    return response;
  };

  useEffect(() => {
    getDefiYieldOptions().then((res) => {
      setDefiYieldOptions(res.data);
    });
  }, [])

  console.log("defiYieldOptions", defiYieldOptions)

  useEffect(() => {
    if (address) fetchMyTokenBalances(address).then(res => setUserTokenBalances(res?.data?.items));
  }, [address]);

  useEffect(() => {
    chain?.name !== "Ethereum" ? setModalOpen(true) : setModalOpen(false)

  }, [chain])

  return (
    <StateContext.Provider value={{
      defiYieldOptions,
      userTokenBalances,
      address,
      modalOpen,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);