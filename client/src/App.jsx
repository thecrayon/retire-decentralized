import React from "react";
import { Route, Routes } from "react-router-dom";

import {
  FAQ,
  Footer,
  HowItWorks,
  Navbar,
  PeerComparison,
  VideoDemo,
  WhereWeAreHeaded,
} from "./components";

import { Home, RetirementCalculator } from "./pages";

const App = () => {
  return (
    <div className="flex relative">
      <div className="fixed z-10 w-full">
        <Navbar />
      </div>

      <div className="container mx-auto overflow-hidden mt-20">
        <div className="min-h-screen">
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
