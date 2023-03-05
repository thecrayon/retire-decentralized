import React from "react";
import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./components";
import CustomCard from "./components/CustomCard";
import SwitchNetworkModal from "./components/Modals/SwitchNetworkModal";
import { useStateContext } from "./context/ContextProvider";
import { Home } from "./pages";
import RetirementAccount from "./pages/RetirementAccount";

const App = () => {
  const { modalOpen, address } = useStateContext();
  return (
    <div className="flex relative">
      <div className="fixed z-10 w-full">
        <Navbar />
      </div>

      <div className="container mx-auto overflow-hidden mt-20">
        {address ? (
          <div className="min-h-screen">
            {modalOpen && <SwitchNetworkModal />}
            <Routes>
              <Route path="*" element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route
                path="/retirement-account"
                element={<RetirementAccount />}
              />
            </Routes>
          </div>
        ) : (
          <div className="min-h-screen">
            <CustomCard>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-1">
                  Welcome to Regen! <br /> <br /> To get started on your crypto
                  retirement journey, <br /> <br />
                  <span className="font-bold">Please connect a wallet</span>
                </div>
              </div>
            </CustomCard>
          </div>
        )}

        {/* footer */}
        <div className=" mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
