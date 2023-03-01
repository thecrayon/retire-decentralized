import React from "react";
import { Route, Routes } from "react-router-dom";

import { Footer, Navbar } from "./components";
import { useStateContext } from "./context/ContextProvider";
import { Home, RetirementCalculator } from "./pages";
import SwitchNetworkModal from "./SwitchNetworkModal";

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
            <Route path="/" element={<Home />} />
            <Route
              path="/plan-your-retirement/retirement-calculator"
              element={<RetirementCalculator />}
            />
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
