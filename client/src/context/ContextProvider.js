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
  const {chain} = useNetwork();
  
  // custom hook to get user token balances in wallet on eth mainnet
  const { fetchMyTokenBalances } = useAllBalances();

  // calculator state
  const [retirementCalculatorData, setRetirementCalculatorData] = useState({
    yearsUntilRetire: 50,
    annualReturnRate: 50,
  });

  const { llamaFiURL } = CONSTANTS;

  const getDefiYieldOptions = async () => {
    const result = await fetch(llamaFiURL);
    const response = await result.json();
    return response;
  };

  useEffect(() => {
    getDefiYieldOptions().then((res) => {
      setDefiYieldOptions(res.data);
    });
  }, [])

  // fetch user token balances on eth mainnet
  useEffect(() => {
    if (address) fetchMyTokenBalances(address).then(res => setUserTokenBalances(res?.data?.items));
  }, [address]);

  const [userTokenBalancesWithInvestmentData, setUserTokenBalancesWithInvestmentData] = useState([]);
  // when userTokenBalances changes or defiYieldOptions changes, create a new array of objects with userTokenBalances and an array of all the defi yield options available for that token
  useEffect(() => {
    
    if (userTokenBalances && defiYieldOptions) {
      const userTokenBalancesWithInvestmentData = userTokenBalances.map((userTokenBalance) => {
        const defiYieldOptionsForToken = defiYieldOptions.filter((defiYieldOption) => 
        defiYieldOption.symbol === userTokenBalance.contract_ticker_symbol && 
        defiYieldOption.chain === "Ethereum" && 
        defiYieldOption.apyBase !== null && 
        defiYieldOption.apyBase !== 0).slice(0,3);
        return {
          ...userTokenBalance,
          defiYieldOptionsForToken,
        }
      })
      setUserTokenBalancesWithInvestmentData(userTokenBalancesWithInvestmentData);
    }
  }, [userTokenBalances, defiYieldOptions]);

  const getTotalValueOfAllTokensInWallet = (userTokenBalancesWithInvestmentData) => {
    const totalValueOfAllTokensInWallet = userTokenBalancesWithInvestmentData.reduce((acc, userTokenBalanceWithInvestmentData) => {
      return acc + userTokenBalanceWithInvestmentData.quote;
    }, 0);
    return totalValueOfAllTokensInWallet;
  };

  const getWeightedAverageApyForToken = (defiYieldOptionsForToken, userTokenBalance, totalValueOfAllTokensInWallet) => {
    const weightedAverageApyForToken = defiYieldOptionsForToken.reduce((acc, defiYieldOptionForToken) => {
      const weightedApyForToken = (defiYieldOptionForToken.apy * userTokenBalance.quote) / totalValueOfAllTokensInWallet;
      return acc + weightedApyForToken;
    }, 0);
    return weightedAverageApyForToken;
  };

  // when userTokenBalancesWithInvestmentData changes, calculate 1) total value of all tokens in wallet and 2) calculate the weighted average of all the defi yield options for each token (weighted by the amount of that token in the wallet and the arithmetic average apy of the defi yield option)
  useEffect(() => {
    if (userTokenBalancesWithInvestmentData) {
      const totalValueOfAllTokensInWallet =  getTotalValueOfAllTokensInWallet(userTokenBalancesWithInvestmentData);
      const weightedAverageApyForAllTokens = userTokenBalancesWithInvestmentData.reduce((acc, userTokenBalanceWithInvestmentData) => {
        const weightedAverageApyForToken = getWeightedAverageApyForToken(userTokenBalanceWithInvestmentData.defiYieldOptionsForToken, userTokenBalanceWithInvestmentData, totalValueOfAllTokensInWallet);
        return acc + weightedAverageApyForToken;
      }, 0);

      setRetirementCalculatorData({
        ...retirementCalculatorData,
        annualReturnRate: weightedAverageApyForAllTokens.toFixed(2),
        totalValueOfAllTokensInWallet,
      })
    }
  }, [userTokenBalancesWithInvestmentData]);

  console.log("defi", userTokenBalances);

  // check if user is on eth mainnet and open modal if not
  useEffect(() => {
    if (!address) return;
    else {
      chain?.name !== "Ethereum" ? setModalOpen(true) : setModalOpen(false)
    }
  }, [chain, address])

  return (
    <StateContext.Provider value={{
      defiYieldOptions,
      userTokenBalances,
      userTokenBalancesWithInvestmentData,
      address,
      modalOpen,
      retirementCalculatorData,
      setRetirementCalculatorData,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);