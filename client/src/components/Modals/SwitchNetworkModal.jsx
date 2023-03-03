import React from "react";
import Modal from "react-modal";
import { useSwitchNetwork } from "wagmi";

import { styles } from "../../styles";
import { useStateContext } from "../../context/ContextProvider";

const SwitchNetworkModal = () => {
  const { modalOpen } = useStateContext();

  const { switchNetworkAsync } = useSwitchNetwork();

  // TODO: if !address then show a message to connect wallet first before switching network

  return (
    <Modal
      isOpen={modalOpen}
      className={`fixed inset-y-14 ${styles.flexCenter} flex-col ${styles.glassEffect} z-10 h-[100%] w-[100%]`}
      overlayClassName="Overlay"
      ariaHideApp={false}
    >
      <button
        className={styles.primaryButton}
        onClick={async () => switchNetworkAsync(1)}
      >
        Switch to Ethereum Mainnet
      </button>
    </Modal>
  );
};

export default SwitchNetworkModal;
