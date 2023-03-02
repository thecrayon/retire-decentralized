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

const YieldDetailsModal = () => {
  const { yieldDetailsModal, setYieldDetailsModal } = useStateContext();
  const { data } = yieldDetailsModal;

  const handleClose = () =>
    setYieldDetailsModal((prev) => ({ ...prev, isOpen: false }));

  return (
    <Modal isOpen={yieldDetailsModal.isOpen} onClose={handleClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" className="font-poppins">
          {yieldDetailsModal.view === "details" &&
            `Yield Options for Your ${data.contract_ticker_symbol}`}
          {yieldDetailsModal.view === "invest" && "Invest"}
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
            width="80%"
          >
            <Text className="w-full">
              <div className="w-[4/5] min-h-[400px] overflow-y-scroll">
                {yieldDetailsModal.view === "details" ? (
                  <YieldDetails data={data} />
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

export default YieldDetailsModal;
