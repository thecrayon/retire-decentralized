import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { GiSoccerBall } from "react-icons/gi";
import {
  MdOutlineAccountBalanceWallet,
  MdOutlineRoomPreferences,
} from "react-icons/md";
import TabItem from "../components/TabItem";
import { ConnectWallets, Goal, Risk } from "../components/Wizard";

const formTabs = [
  {
    title: "goal",
    icon: GiSoccerBall,
  },
  {
    title: "risk",
    icon: MdOutlineRoomPreferences,
  },
  {
    title: "wallets",
    icon: MdOutlineAccountBalanceWallet,
  },
];

const Wizard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const handleClose = () => {};

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="3xl">
      <ModalOverlay />

      <ModalContent width="full">
        <Stack direction="row" spacing={0}>
          {formTabs.map((item) => (
            <TabItem
              key={item.title}
              item={item}
              selected={item.title === selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ))}
        </Stack>
        <ModalCloseButton />
        <ModalBody
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          pb={6}
        >
          <Flex
            direction="column"
            align="center"
            justifyContent="center"
            width="100%"
          >
            <Flex
              width="full"
              alignContent="center"
              justifyContent="center"
              mt={{ base: "5", md: "10" }}
            >
              <Box overflow="scroll" minH="400px">
                {selectedTab === "goal" && <Goal />}
                {selectedTab === "risk" && <Risk />}
                {selectedTab === "wallets" && <ConnectWallets />}
              </Box>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Wizard;
