import React, { useEffect, useState } from "react";
import { REGENRETIRECONTRACTADDRESS } from "../../constants";
import { useStateContext } from "../../context/ContextProvider";

import useTransactions from "../../hooks/useTransactions";
import Loader from "../Loader";
import Deposit from "./components/Deposit";

const EmployeeRetireView = () => {
  const { fetchTransactions, transactions, loading } = useTransactions();
  const { address } = useStateContext();
  const [data, setData] = useState([]);

  //   fetch transactions
  useEffect(() => {
    const getTransactions = async () => {
      await fetchTransactions(address);
    };
    if (address) getTransactions();
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      const data = transactions.filter((tx) => {
        return tx.to_address === REGENRETIRECONTRACTADDRESS;
      });

      setData(data);
    }
  }, [transactions]);

  console.log("data", data);

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}
      {data.length > 0 ? (
        <>
          {data.map((tx) => {
            return <Deposit depositDate={tx?.block_signed_at?.slice(0, 10)} />;
          })}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default EmployeeRetireView;
