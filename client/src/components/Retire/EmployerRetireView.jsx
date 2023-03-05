import { Alert, AlertIcon, Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";

import { useStateContext } from "../../context/ContextProvider";
import useRetirementAccount from "../../hooks/useRetirementAccount";
import { formatAddress } from "../../helpers";

const EmployerRetireView = () => {
  const { address, chain } = useStateContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [depositData, setDepositData] = useState({
    addressTo: "",
    amount: "",
  });

  const { deposit, loading } = useRetirementAccount();

  // regex to check if address is valid
  const validAddress = /^0x[a-fA-F0-9]{40}$/;

  const handleDeposit = async () => {
    setErrorMessage("");

    if (!address || chain.name !== "Avalanche Fuji") {
      setErrorMessage(
        "Please make sure your wallet is connected and you're on the Avalanche Fuji testnet"
      );
      return;
    }

    if (!depositData.addressTo || !validAddress.test(depositData.addressTo)) {
      setErrorMessage("Please enter a valid address to send to");
      return;
    }

    if (depositData.addressTo.toLowerCase() === address.toLowerCase()) {
      setErrorMessage("You can't send to yourself");
      return;
    }

    if (!depositData.amount || depositData.amount <= 0) {
      setErrorMessage("Please enter a valid amount");
      return;
    }

    await deposit({
      depositToAddress: depositData.addressTo,
      depositAmount: depositData.amount,
    });

    setSuccessMessage("Deposit successful");
  };

  return (
    <>
      <div className="mb-3">
        {errorMessage && (
          <Alert status="error">
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}
      </div>
      <Flex direction="column" gap={3}>
        <Input
          type="string"
          placeholder="Deposit In Address (e.g., 0x...)"
          onChange={(e) =>
            setDepositData((prev) => ({ ...prev, addressTo: e.target.value }))
          }
          required
          pattern="^0x[a-fA-F0-9]{40}$"
        />
        <Input
          placeholder="Amount (AVAX)"
          onChange={(e) =>
            setDepositData((prev) => ({ ...prev, amount: e.target.value }))
          }
          required
          type="number"
        />
        <Button
          backgroundColor="#3b82f6"
          color="white"
          onClick={handleDeposit}
          isLoading={loading}
        >
          Deposit
        </Button>
        {successMessage && (
          <Alert status="success" mt={3}>
            <AlertIcon />
            Deposit to {formatAddress(depositData?.addressTo)} successful
          </Alert>
        )}
      </Flex>
    </>
  );
};

export default EmployerRetireView;
