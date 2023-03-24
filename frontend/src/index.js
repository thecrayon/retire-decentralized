import { ChakraProvider } from "@chakra-ui/react";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { avalancheFuji, mainnet } from "wagmi/chains";

import App from "./App";
import { theme } from "./chakra/theme";
import { ContextProvider } from "./context/ContextProvider";
import "./index.css";

const Application = () => {
  const chains = [mainnet, avalancheFuji];

  // Wagmi client
  const { provider } = configureChains(chains, [
    walletConnectProvider({
      projectId: process.env.REACT_APP_WEB3_MODAL_PROJECT_ID,
    }),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({
      projectId: process.env.REACT_APP_WEB3_MODAL_PROJECT_ID,
      version: "2", // or "1"
      appName: "web3Modal",
      chains,
    }),
    provider,
  });

  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <>
      <Web3Modal
        projectId={process.env.REACT_APP_WEB3_MODAL_PROJECT_ID}
        ethereumClient={ethereumClient}
        themeMode="light"
      />
      <BrowserRouter>
        <WagmiConfig client={wagmiClient} />
        <WagmiConfig client={wagmiClient}>
          <ChakraProvider theme={theme}>
            <ContextProvider>
              <App />
            </ContextProvider>
          </ChakraProvider>
        </WagmiConfig>
      </BrowserRouter>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
);
