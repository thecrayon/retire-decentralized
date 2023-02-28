import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Chart, Assets, Table } from "../components";

import useAllBalances from "../hooks/useAllBalances";

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
];

const RetirementCalculator = () => {
  const { fetchMyTokenBalances } = useAllBalances();
  const { address } = useAccount();

  const [tokenBalances, setTokenBalances] = useState();
  const [formattedTokenBalances, setFormattedTokenBalances] = useState();

  // get user token balances in currently connected wallet
  useEffect(() => {
    const getTokenBalances = async () => {
      const tokenBalances = await fetchMyTokenBalances(address);
      setTokenBalances(tokenBalances?.data?.items);
    };

    if (address) getTokenBalances();
  }, [address]);

  console.log("formattedBalance", formattedTokenBalances);

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

  // get all pools from llama.fi
  useEffect(() => {
    fetch("https://yields.llama.fi/pools")
      .then((response) => response.json())
      // .then((data) => {
      //   console.log(
      //     data.data.filter(
      //       (item) => item.chain === "Ethereum" && item.project === "curve"
      //     )
      //   );
      // })
      .catch((error) => {
        // Handle any errors that occur
        console.error(error);
      });
  }, []);

  return (
    <div className="container mx-auto p-2 mt-20">
      <div className="flex flex-col md:flex-row items-center gap-5 justify-center md:items-start md:justify-start">
        <div className="w-full">
          <Table
            id="Assets"
            drawerClickFunc={() => {}}
            data={formattedTokenBalances || []}
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
