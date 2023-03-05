import { Alert, AlertIcon, Button } from "@chakra-ui/react";
import React, { useState } from "react";

import useRetirementAccount from "../hooks/useRetirementAccount";
import { useStateContext } from "../context/ContextProvider";

const EmployerDeposit = async () => {
  const { deposit, loading } = useRetirementAccount();
  const { address } = useStateContext();
  const [first, setfirst] = useState("");

  const handleDeposit = async () => {
    if (!address) {
      //   setErrorMessage("Please connect your wallet first");
      return;
    }

    await deposit();
  };

  return (
    <>
      <Button
        backgroundColor="#3b82f6"
        color="white"
        onClick={handleDeposit}
        isLoading={loading}
      >
        Deposit
      </Button>
    </>
  );
};

export default EmployerDeposit;
