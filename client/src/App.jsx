import React from "react";
import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./components";
import SwitchNetworkModal from "./components/Modals/SwitchNetworkModal";
import { useStateContext } from "./context/ContextProvider";
import { Home } from "./pages";
import RetirementAccount from "./pages/RetirementAccount";

const App = () => {
  const { modalOpen } = useStateContext();
  return (
    <div className="flex relative">
      <div className="fixed z-10 w-full">
        <Navbar />
      </div>

      <div className="container mx-auto overflow-hidden mt-20">
        <div className="min-h-screen">
          {modalOpen && <SwitchNetworkModal />}
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/retirement-account" element={<RetirementAccount />} />
          </Routes>
        </div>

        {/* footer */}
        <div className=" mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
