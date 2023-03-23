import { Alert, AlertIcon, Button, Flex, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useBalance } from "wagmi";

import { useStateContext } from "../../context/ContextProvider";
import useRetirementAccount from "../../hooks/useRetirementAccount";
import { convertToDecimal, formatAddress } from "../../helpers";

// regex to check if address is valid
const validAddress = /^0x[a-fA-F0-9]{40}$/;

const EmployerRetireView = () => {
  const { address, chain } = useStateContext();
  const { data, isError, isLoading } = useBalance({
    address: address,
  });
  const { deposit, loading, error } = useRetirementAccount();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [depositData, setDepositData] = useState({
    addressTo: "",
    amount: "",
  });

  const balance = convertToDecimal(data?.value?._hex);

  useEffect(() => {
    if (error) {
      setSuccessMessage("");
      setErrorMessage("");
      setErrorMessage(error);
    }
  }, [error]);

  const handleDeposit = async () => {
    setErrorMessage("");

    if (!address || chain.name !== "Avalanche Fuji") {
      setErrorMessage(
        "Please make sure your wallet is connected and you're on the Avalanche Fuji testnet"
      );
      return;
    }

    if (balance < depositData.amount) {
      setErrorMessage("You don't have enough AVAX to deposit");
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
          mt={2}
        >
          <span className="font-poppins text-[14px]">Deposit</span>
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
