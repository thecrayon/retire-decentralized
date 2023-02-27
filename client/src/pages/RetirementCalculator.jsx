import React, { useEffect, useState } from "react";
import { useAccount, useBalance, useToken, erc20ABI } from "wagmi";
import { fetchBalance } from "@wagmi/core";

const RetirementCalculator = () => {
  const [tokenBalances, setTokenBalances] = useState();
  const { address } = useAccount();
  const { data, isLoading } = useBalance({ address: address });

  useEffect(() => {
    const getBalances = async () => {
      const balance = await fetchBalance({ address: address });
      console.log(balance);

      setTokenBalances([
        { symbol: balance?.symbol, balance: balance?.formatted.slice(0, 5) },
      ]);
    };

    if (address) getBalances();
  }, [address]);

  console.log(tokenBalances);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {tokenBalances ? (
        tokenBalances.map((token) => (
          <div className="flex flex-row gap-5">
            <p>{token.symbol}</p>
            <p>{token.balance}</p>
          </div>
        ))
      ) : (
        <div>no data</div>
      )}
    </div>
  );
};

export default RetirementCalculator;
