import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Chart, Table } from "../components";

import useAllBalances from "../hooks/useAllBalances";

import { useStateContext } from "../context/ContextProvider";

const data = [
  { month: "Jan", sales: 35 },
  { month: "Feb", sales: 28 },
  { month: "Mar", sales: 34 },
  { month: "Apr", sales: 32 },
  { month: "May", sales: 40 },
  { month: "Jun", sales: 32 },
  { month: "Jul", sales: 35 },
  { month: "Aug", sales: 55 },
  { month: "Sep", sales: 38 },
  { month: "Oct", sales: 30 },
  { month: "Nov", sales: 25 },
  { month: "Dec", sales: 32 },
];

const tableColumns = [
  { field: "contract_ticker_symbol", headerText: "Token Symbol", width: 120 },
  {
    field: "formattedBalance",
    headerText: "Quantity",
    width: 120,
    textAlign: "Right",
  },
  {
    field: "quote",
    headerText: "Value in USD",
    width: 120,
    textAlign: "Right",
  },
  {
    field: "low",
    headerText: "Lowest Yield %",
    width: 120,
    textAlign: "Right",
  },
  {
    field: "hi",
    headerText: "Highest Yield %",
    width: 120,
    textAlign: "Right",
  },
];

const RetirementCalculator = () => {
  const { defiYieldOptions } = useStateContext();
  const { fetchMyTokenBalances } = useAllBalances();
  const { address } = useAccount();

  const [tokenBalances, setTokenBalances] = useState();
  const [formattedTokenBalances, setFormattedTokenBalances] = useState();
  const [filteredYieldOptions, setFilteredYieldOptions] = useState();
  const [tokenHiLowYield, setTokenHiLowYield] = useState();

  // get user token balances in currently connected wallet
  useEffect(() => {
    const getTokenBalances = async () => {
      const tokenBalances = await fetchMyTokenBalances(address);
      setTokenBalances(tokenBalances?.data?.items);
    };

    if (address) getTokenBalances();
  }, [address]);

  // when tokenBalances changes, take the defi yield options and filter out the ones that match the token symbol
  useEffect(() => {
    if (tokenBalances && defiYieldOptions) {
      const filteredDefiYieldOptions = defiYieldOptions?.data?.filter(
        (item) => {
          const { symbol } = item;
          const tokenBalance = tokenBalances.find(
            (token) =>
              token.contract_ticker_symbol === symbol &&
              item.chain === "Ethereum"
          );
          return tokenBalance;
        }
      );
      console.log("filteredDefiYieldOptions", filteredDefiYieldOptions);
      setFilteredYieldOptions(filteredDefiYieldOptions);
    }
  }, [tokenBalances, defiYieldOptions]);

  useEffect(() => {
    // if tokenbalances, then extract "balance", "contract_decimals", "quote" into a new array
    if (tokenBalances) {
      const tokenBalancesArray = tokenBalances.map((item) => {
        const { balance, contract_decimals, quote, contract_ticker_symbol } =
          item;
        const formattedBalance = balance / 10 ** contract_decimals;
        return {
          balance,
          contract_decimals,
          quote,
          contract_ticker_symbol,
          formattedBalance,
        };
      });
      setFormattedTokenBalances(tokenBalancesArray);
    }
  }, [tokenBalances]);

  useEffect(() => {
    if (tokenBalances && filteredYieldOptions) {
      const tokenHiLowYield = tokenBalances.map((token) => {
        const { contract_ticker_symbol } = token;
        const tokenYieldOptions = filteredYieldOptions.filter(
          (item) => item.symbol === contract_ticker_symbol
        );
        const tokenHiLow = {
          contract_ticker_symbol,
          hi: Math.max(...tokenYieldOptions.map((item) => item.apy)),
          low: Math.min(...tokenYieldOptions.map((item) => item.apy)),
        };
        return tokenHiLow;
      });
      setTokenHiLowYield(tokenHiLowYield);
    }
  }, [tokenBalances, filteredYieldOptions]);

  const [finalData, setFinalData] = useState();
  useEffect(() => {
    // merge tokenBalances with tokenHiLowYield
    if (tokenBalances && tokenHiLowYield) {
      const mergedTokenBalances = tokenBalances.map((token) => {
        const { contract_ticker_symbol } = token;
        const tokenYield = tokenHiLowYield.find(
          (item) => item.contract_ticker_symbol === contract_ticker_symbol
        );
        return { ...token, ...tokenYield };
      });
      setFinalData(mergedTokenBalances);
    }
  }, [tokenBalances, tokenHiLowYield]);

  const [totalPortfolioValue, setTotalPortfolioValue] = useState();
  useEffect(() => {
    // sum up the total value of all tokens
    if (finalData) {
      const totalValue = finalData.reduce((acc, item) => {
        return acc + item.quote;
      }, 0);
      console.log("totalValue", totalValue);
    }
  }, [finalData]);

  return (
    <div className="container mx-auto p-2 mt-20">
      <div className="flex flex-col md:flex-row items-center gap-5 justify-center md:items-start md:justify-start">
        <div className="w-full">
          <Table
            id="Assets"
            drawerClickFunc={() => {}}
            data={finalData || []}
            tableColumns={tableColumns}
            paging={true}
          />
        </div>
        <div className="w-full">
          <Chart data={data} xName="month" yName="sales" name="sales" />
        </div>
      </div>
    </div>
  );
};

export default RetirementCalculator;
