import {
  Button,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useStateContext } from "../../../context/ContextProvider";
import { formatAddress } from "../../../helpers";

const pattern = "^0x[a-fA-F0-9]{40}$";

const ConnectWallets = () => {
  const [wallet, setWallet] = useState("");
  const [connectedWallets, setConnectedWallets] = useState([]);
  const { setToastMessage } = useStateContext();

  const onWalletAdd = () => {
    if (!wallet || !wallet.trim()) return;

    if (!wallet.match(pattern)) {
      setToastMessage({
        title: "Invalid wallet address",
        description: "Please enter a valid wallet address.",
        status: "error",
      });
      return;
    }

    if (connectedWallets.includes(wallet)) {
      setToastMessage({
        title: "Wallet already added",
        description: "Please add a new wallet.",
        status: "error",
      });
      return;
    }

    const wallets = [...connectedWallets];
    wallets.push(String(wallet));
    setConnectedWallets([...wallets]);

    setWallet("");
  };

  return (
    <>
      {connectedWallets.length > 0 && (
        <TableContainer>
          <Table
            variant="striped"
            colorScheme="primary"
            color="whiteAlpha"
            align="center"
            justifyContent="center"
          >
            <Thead>
              <Tr>
                <Th>Wallet</Th>
                <Th>Address</Th>
              </Tr>
            </Thead>
            {connectedWallets?.map((wallet, index) => (
              <Tbody>
                <Tr>
                  <Td>{index + 1}</Td>
                  <Td>{formatAddress(wallet)}</Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </TableContainer>
      )}

      {/* add wallet here */}
      <Stack
        direction="column"
        spacing={3}
        mt={connectedWallets.length > 0 && "10"}
        width="400px"
        align="center"
        justify="center"
      >
        <Text fontWeight={700} fontSize="lg">
          Add a wallet!
        </Text>
        <Input
          type="text"
          placeholder="0x..."
          width="full"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />

        <Button
          backgroundColor="#3b82f6"
          color="white"
          onClick={onWalletAdd}
          width="full"
        >
          Add
        </Button>
      </Stack>
    </>
  );
};

export default ConnectWallets;
