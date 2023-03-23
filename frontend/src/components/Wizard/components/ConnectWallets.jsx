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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { formatAddress } from "../../../helpers";

const ConnectWallets = () => {
  const [wallet, setWallet] = useState("");
  const [connectedWallets, setConnectedWallets] = useState([]);

  const onWalletAdd = () => {
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
        <Text fontWeight={700} fontSize="md">
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
