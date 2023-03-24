/* eslint-disable */
import { useToast } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useNetwork } from "wagmi";

import { LLAMAFIURL } from "../constants";
import useAllBalances from "../hooks/useAllBalances";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState({
    title: "",
    description: "",
    status: "",
  });
  // all defi yield options from llama.fi
  const [defiYieldOptions, setDefiYieldOptions] = useState();
  // user token balances
  const [userTokenBalances, setUserTokenBalances] = useState([]);
  // user token balances with yield options
  const [
    userTokenBalancesWithInvestmentData,
    setUserTokenBalancesWithInvestmentData,
  ] = useState([]);

  // Yield details modal
  const [yieldDetailsModal, setYieldDetailsModal] = useState({
    isOpen: false,
    view: "details",
    data: {},
  });

  // Wizard
  // goal
  // risk
  // register-wallets
  const [wizardModal, setWizardModal] = useState({
    isOpen: true,
    view: "goal",
    data: {},
  });

  // WAGMI hooks
  const { address } = useAccount();
  const { chain } = useNetwork();

  // custom hook to get user token balances in wallet on eth mainnet
  const { fetchMyTokenBalances } = useAllBalances();

  const navigate = useNavigate();
  const toast = useToast();

  // calculator state
  const [retirementCalculatorData, setRetirementCalculatorData] = useState({
    yearsUntilRetire: 10,
    annualReturnRate: 5,
    monthlyContribution: 0,
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
  }, []);

  // fetch user token balances on eth mainnet
  useEffect(() => {
    if (address)
      fetchMyTokenBalances(address).then((res) =>
        setUserTokenBalances(res?.data?.items)
      );
  }, [address]);

  // when userTokenBalances changes or defiYieldOptions changes, create a new array of objects with userTokenBalances and an array of all the defi yield options available for that token
  useEffect(() => {
    if (userTokenBalances && defiYieldOptions) {
      let userTokenBalancesWithInvestmentData = userTokenBalances.map(
        (userTokenBalance) => {
          let defiYieldOptionsForToken = defiYieldOptions
            .filter(
              (defiYieldOption) =>
                defiYieldOption.symbol ===
                  userTokenBalance.contract_ticker_symbol &&
                defiYieldOption.chain === "Ethereum" &&
                defiYieldOption.apyBase !== null &&
                defiYieldOption.apyBase !== 0
            )
            .slice(0, 3);

          // sort by apy
          defiYieldOptionsForToken.sort((a, b) => {
            return b.apy - a.apy;
          });

          return {
            ...userTokenBalance,
            defiYieldOptionsForToken,
          };
        }
      );

      // TODO: remove after hackathon. This is only to demonstrate our integration with aave-v3 so user can deploy idle tokens directly into aave from our site
      userTokenBalancesWithInvestmentData =
        userTokenBalancesWithInvestmentData.map(
          (userTokenBalanceWithInvestmentData) => {
            if (
              userTokenBalanceWithInvestmentData.contract_ticker_symbol ===
              "ETH"
            ) {
              const aaveV3 = defiYieldOptions.find(
                (defiYieldOption) =>
                  defiYieldOption.project === "aave-v3" &&
                  defiYieldOption.chain === "Ethereum"
              );
              userTokenBalanceWithInvestmentData.defiYieldOptionsForToken.push(
                aaveV3
              );
            }
            return userTokenBalanceWithInvestmentData;
          }
        );

      setUserTokenBalancesWithInvestmentData(
        userTokenBalancesWithInvestmentData
      );
    }
  }, [userTokenBalances, defiYieldOptions]);

  const getTotalValueOfAllTokensInWallet = (
    userTokenBalancesWithInvestmentData
  ) => {
    const totalValueOfAllTokensInWallet =
      userTokenBalancesWithInvestmentData.reduce(
        (acc, userTokenBalanceWithInvestmentData) => {
          return acc + userTokenBalanceWithInvestmentData.quote;
        },
        0
      );
    return totalValueOfAllTokensInWallet;
  };

  const getWeightedAverageApyForToken = (
    defiYieldOptionsForToken,
    userTokenBalance,
    totalValueOfAllTokensInWallet
  ) => {
    const weightedAverageApyForToken = defiYieldOptionsForToken.reduce(
      (acc, defiYieldOptionForToken) => {
        const weightedApyForToken =
          (defiYieldOptionForToken.apy * userTokenBalance.quote) /
          totalValueOfAllTokensInWallet;
        return acc + weightedApyForToken;
      },
      0
    );
    return weightedAverageApyForToken;
  };

  // when userTokenBalancesWithInvestmentData changes, calculate 1) total value of all tokens in wallet and 2) calculate the weighted average of all the defi yield options for each token (weighted by the amount of that token in the wallet and the arithmetic average apy of the defi yield option)
  useEffect(() => {
    if (userTokenBalancesWithInvestmentData) {
      const totalValueOfAllTokensInWallet = getTotalValueOfAllTokensInWallet(
        userTokenBalancesWithInvestmentData
      );
      const weightedAverageApyForAllTokens =
        userTokenBalancesWithInvestmentData.reduce(
          (acc, userTokenBalanceWithInvestmentData) => {
            const weightedAverageApyForToken = getWeightedAverageApyForToken(
              userTokenBalanceWithInvestmentData.defiYieldOptionsForToken,
              userTokenBalanceWithInvestmentData,
              totalValueOfAllTokensInWallet
            );
            return acc + weightedAverageApyForToken;
          },
          0
        );

      setRetirementCalculatorData({
        ...retirementCalculatorData,
        annualReturnRate: isNaN(weightedAverageApyForAllTokens.toFixed(2))
          ? 0
          : weightedAverageApyForAllTokens.toFixed(2),
        totalValueOfAllTokensInWallet,
      });
    }
  }, [userTokenBalancesWithInvestmentData]);

  // if no address is set, redirect to home page
  useEffect(() => {
    if (!address) navigate("/");
  }, [address]);

  // when error message is set, show chakra toast with error message
  useEffect(() => {
    if (toastMessage.description) {
      toast({
        title: toastMessage.title || "Error",
        description: toastMessage.description || "Error",
        status: toastMessage.status || "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    setToastMessage({ title: "", description: "", status: "" });
  }, [toastMessage.description]);

  return (
    <StateContext.Provider
      value={{
        chain,
        defiYieldOptions,
        userTokenBalances,
        userTokenBalancesWithInvestmentData,
        address,
        retirementCalculatorData,
        setRetirementCalculatorData,
        yieldDetailsModal,
        setYieldDetailsModal,
        wizardModal,
        setWizardModal,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
