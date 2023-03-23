import React from "react";
import Modal from "react-modal";
import { useSwitchNetwork } from "wagmi";
import { Button } from "@chakra-ui/react";

import { styles } from "../../styles";

const SwitchNetworkModal = ({ open, title, chainId }) => {
  const { switchNetworkAsync } = useSwitchNetwork();

  // TODO: if !address then show a message to connect wallet first before switching network
  return (
    <Modal
      isOpen={open}
      className={`fixed inset-y-14 ${styles.flexCenter} flex-col ${styles.glassEffect} z-10 h-[100%] w-[100%]`}
      overlayClassName="Overlay"
      ariaHideApp={false}
    >
      <Button
        backgroundColor="#3b82f6"
        color="white"
        onClick={async () => switchNetworkAsync(chainId)}
      >
        {title}
      </Button>
    </Modal>
  );
};

export default SwitchNetworkModal;
