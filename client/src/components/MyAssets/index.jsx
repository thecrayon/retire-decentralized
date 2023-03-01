import React, { useState } from "react";

import Table from "../Table";
import SmallDeviceAssetDisplay from "./components/SmallDeviceAssetDisplay";
import { useStateContext } from "../../context/ContextProvider";

const tableColumns = [
  { field: "contract_ticker_symbol", headerText: "Token", width: 40 },
  {
    field: "formattedBalance",
    headerText: "Quantity",
    width: 60,
    textAlign: "Right",
  },
  {
    field: "quote",
    headerText: "USD Value",
    width: 60,
    textAlign: "Right",
  },
  {
    field: "low",
    headerText: "Low Yield %",
    width: 60,
    textAlign: "Right",
  },
];

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

const MyAssets = () => {
  const { userTokenBalances } = useStateContext();

  console.log("userTokenBalances", userTokenBalances);

  return (
    <div>
      {/* large devices */}
      <div className="hidden sm:block">
        <Table
          id="myAssets"
          data={data}
          drawerClickFunc={() => {}}
          tableColumns={tableColumns}
          paging
        />
      </div>

      {/* small devices  */}
      <div className="block sm:hidden">
        {/* map through assets and display info */}
        {userTokenBalances &&
          userTokenBalances.map((token) => {
            return (
              <div className="flex flex-wrap gap-3">
                <SmallDeviceAssetDisplay
                  key={token.contract_ticker_symbol}
                  {...token}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyAssets;
