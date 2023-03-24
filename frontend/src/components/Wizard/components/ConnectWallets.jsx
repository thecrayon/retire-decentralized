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
import { formatAddress } from "../../../helpers";

const pattern = "^0x[a-fA-F0-9]{40}$";

const ConnectWallets = () => {
  const [wallet, setWallet] = useState("");
  const [connectedWallets, setConnectedWallets] = useState([]);
  const toast = useToast();

  const showErrorMessage = ({ title, description }) =>
    toast({
      title: title,
      description: description,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });

  const onWalletAdd = () => {
    if (!wallet || !wallet.trim()) return;

    if (!wallet.match(pattern)) {
      showErrorMessage({
        title: "Invalid wallet address",
        description: "Please enter a valid wallet address.",
      });
      return;
    }

    if (connectedWallets.includes(wallet)) {
      showErrorMessage({
        title: "Wallet already added",
        description: "Please add a new wallet.",
      });
      return;
    }

    const wallets = [...connectedWallets];
    wallets.push(String(wallet));
    setConnectedWallets([...wallets]);

    setWallet("");
  };

  console.log(connectedWallets);

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
        {/* for some reason lg fontsize isn't applying same size font here as in rest of project */}
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
