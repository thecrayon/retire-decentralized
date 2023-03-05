import React from "react";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { useStateContext } from "../../context/ContextProvider";
import YieldDetails from "./components/YieldDetails";
import Deposit from "./components/Deposit";

const RetirementDeposit = () => {
  const { depositDetailsModal, setDepositDetailsModal } = useStateContext();
  const { data } = depositDetailsModal;

  const handleClose = () =>
    setDepositDetailsModal((prev) => ({ ...prev, isOpen: false }));

  return (
    <Modal isOpen={depositDetailsModal.isOpen} onClose={handleClose} size="md">
      <ModalOverlay />
      <ModalContent width="full">
        <ModalHeader textAlign="center" className="font-poppins">
          {depositDetailsModal.view === "details" &&
            `Deposit Details  ${data.contract_ticker_symbol}`}
        </ModalHeader>
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
            <Text className="w-full">
              <div className="w-[4/5] min-h-[400px] overflow-y-scroll">
                {depositDetailsModal.view === "details" ? (
                  <Deposit data={data} />
                ) : (
                  <></>
                )}
              </div>
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RetirementDeposit;
