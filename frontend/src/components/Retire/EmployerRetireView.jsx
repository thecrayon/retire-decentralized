import { Alert, AlertIcon, Button, Flex, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useBalance } from "wagmi";

import { useStateContext } from "../../context/ContextProvider";
import { convertToDecimal, formatAddress } from "../../helpers";
import useRetirementAccount from "../../hooks/useRetirementAccount";
import useTransactions from "../../hooks/useTransactions";

// regex to check if address is valid
const validAddress = /^0x[a-fA-F0-9]{40}$/;

const EmployerRetireView = () => {
  const { address, chain, setToastMessage } = useStateContext();
  const { data } = useBalance({
    address: address,
  });
  const { deposit, loading, error } = useRetirementAccount();
  const { fetchTransactions } = useTransactions();
  const [depositData, setDepositData] = useState({
    addressTo: "",
    amount: "",
  });

  const balance = convertToDecimal(data?.value?._hex);

  useEffect(() => {
    if (error) {
      setToastMessage({
        title: "401k Deposit Error",
        description:
          "There was an error depositing to your 401k. Please try again later.",
        status: "error",
      });
    }
  }, [error]);

  const handleDeposit = async () => {
    if (!address || chain.name !== "Avalanche Fuji") {
      setToastMessage(
        "Please make sure your wallet is connected and you're on the Avalanche Fuji testnet."
      );
      return;
    }

    if (balance < depositData.amount) {
      setToastMessage({
        title: "Insufficient AVAX",
        description:
          "You don't have enough AVAX to deposit. Please deposit a smaller amount or add more AVAX to your wallet.",
        status: "error",
      });
      return;
    }

    if (!depositData.addressTo || !validAddress.test(depositData.addressTo)) {
      setToastMessage({
        title: "Invalid Address",
        description: "Please enter a valid address to send to.",
        status: "error",
      });
      return;
    }

    if (depositData.addressTo.toLowerCase() === address.toLowerCase()) {
      setToastMessage({
        title: "Invalid Address",
        description:
          "You can't send to yourself. Please enter a valid address to send to.",
        status: "error",
      });
      return;
    }

    if (!depositData.amount || depositData.amount <= 0) {
      setToastMessage({
        title: "Invalid Amount",
        description: "Please enter a valid amount to deposit.",
        status: "error",
      });
      return;
    }

    await deposit({
      depositToAddress: depositData.addressTo,
      depositAmount: depositData.amount,
    });

    setToastMessage({
      title: "Deposit Successful",
      description: `You have successfully deposited ${
        depositData.amount
      } AVAX to ${formatAddress(depositData.addressTo)}`,
      status: "success",
    });

    setDepositData({
      addressTo: "",
      amount: "",
    });

    fetchTransactions();
  };

  return (
    <>
      <Flex direction="column" gap={3}>
        <Input
          type="string"
          value={depositData.addressTo}
          placeholder="Deposit In Address (e.g., 0x...)"
          onChange={(e) =>
            setDepositData((prev) => ({ ...prev, addressTo: e.target.value }))
          }
          required
          pattern="^0x[a-fA-F0-9]{40}$"
        />
        <Input
          placeholder="Amount (AVAX)"
          value={depositData.amount}
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
      </Flex>
    </>
  );
};

export default EmployerRetireView;
