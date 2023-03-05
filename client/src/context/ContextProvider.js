/* eslint-disable */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useNetwork } from "wagmi";

import { LLAMAFIURL } from '../constants';
import useAllBalances from '../hooks/useAllBalances';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  // all defi yield options from llama.fi
  const [defiYieldOptions, setDefiYieldOptions] = useState();
  // user token balances
  const [userTokenBalances, setUserTokenBalances] = useState([]);
  // user token balances with yield options
  const [userTokenBalancesWithInvestmentData, setUserTokenBalancesWithInvestmentData] = useState([]);


  // Yield details modal
  const [yieldDetailsModal, setYieldDetailsModal] = useState({
    isOpen: false,
    view: "details",
    data: {},
  });

  // Deposit details modal
  const [depositDetailsModal, setDepositDetailsModal] = useState({
    isOpen: false,
    view: "details",
    data: {},
  });

  // WAGMI hooks
  const { address } = useAccount();
  const {chain} = useNetwork();
  
  // custom hook to get user token balances in wallet on eth mainnet
  const { fetchMyTokenBalances } = useAllBalances();

  const navigate = useNavigate();

  // calculator state
  const [retirementCalculatorData, setRetirementCalculatorData] = useState({
    yearsUntilRetire: 10,
    annualReturnRate: 5,
    monthlyContribution: 0,
    //initial amount
  });

  const getDefiYieldOptions = async () => {
    const result = await fetch(LLAMAFIURL);
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

  // when userTokenBalances changes or defiYieldOptions changes, create a new array of objects with userTokenBalances and an array of all the defi yield options available for that token
  useEffect(() => {
    
    if (userTokenBalances && defiYieldOptions) {
      const userTokenBalancesWithInvestmentData = userTokenBalances.map((userTokenBalance) => {
        let defiYieldOptionsForToken = defiYieldOptions.filter((defiYieldOption) => 
        defiYieldOption.symbol === userTokenBalance.contract_ticker_symbol && 
        defiYieldOption.chain === "Ethereum" && 
        defiYieldOption.apyBase !== null && 
        defiYieldOption.apyBase !== 0).slice(0,3)
      
        // sort by apy
        defiYieldOptionsForToken.sort((a, b) => {
          return b.apy - a.apy;
        });

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
        annualReturnRate: (weightedAverageApyForAllTokens.toFixed(2)),
        totalValueOfAllTokensInWallet,
      })
    }
  }, [userTokenBalancesWithInvestmentData]);

// if no address is set, redirect to home page
  useEffect(() => {
    if (!address) navigate("/");
  }, [address]);
  
  return (
    <StateContext.Provider value={{
      chain,
      defiYieldOptions,
      userTokenBalances,
      userTokenBalancesWithInvestmentData,
      address,
      retirementCalculatorData,
      setRetirementCalculatorData,
      yieldDetailsModal,
      setYieldDetailsModal,
      depositDetailsModal,
      setDepositDetailsModal,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);