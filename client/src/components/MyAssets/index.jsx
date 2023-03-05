import React from "react";

import { useStateContext } from "../../context/ContextProvider";
import Loader from "../Loader";
import Asset from "./components/Asset";

const MyAssets = () => {
  // TODO: add an alert if userTokenBalances total doesn't match userTokenBalancesWithInvestmentData total
  // this can happen if user has a token in their wallet that doesn't have data in the llama.fi API (e.g. a token that they've minted themselves)
  const { userTokenBalancesWithInvestmentData } = useStateContext();

  return (
    <>
      {userTokenBalancesWithInvestmentData.length > 0 ? (
        userTokenBalancesWithInvestmentData.map((token) => {
          return <Asset key={token.contract_ticker_symbol} {...token} />;
        })
      ) : (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default MyAssets;
