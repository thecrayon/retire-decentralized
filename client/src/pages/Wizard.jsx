import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tab,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { GiSoccerBall } from "react-icons/gi";
import {
  MdOutlineRoomPreferences,
  MdOutlineAccountBalanceWallet,
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
  const { wizardModal, setWizardModal } = useStateContext();
  const [selectedTab, setSelectedTab] = useState(formTabs[0]);
  const handleClose = () => {};

  // pages
  // Hi, Tell us about yourself. We won't share your information with anyone.

  // What is your goal: 1) retire 2) sabbatical
  // page: wizard/goal

  // What's your risk tolerance? 1) low 2) medium 3) high
  // page: wizard/risk

  // Register your crypto wallets
  // page: wizard/register-wallets

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
              <div className="w-[4/5] min-h-[400px] overflow-y-scroll">
                {selectedTab === "goal" && <Goal />}
                {selectedTab === "risk" && <Risk />}
                {selectedTab === "wallets" && <ConnectWallets />}
              </div>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Wizard;
