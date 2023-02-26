import React from "react";
import { Route, Routes } from "react-router-dom";

import {
  Navbar,
  Home,
  VideoDemo,
  HowItWorks,
  WhereWeAreHeaded,
  RetirementCalculator,
  PeerComparison,
  FAQ,
} from "./components";

const App = () => {
  return (
    <div className="flex relative">
      <div className="fixed z-10 w-full">
        <Navbar />
      </div>

      <div className="mt-20">
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/about/how-it-works" element={<HowItWorks />} />
          <Route
            path="/about/where-we-are-headed"
            element={<WhereWeAreHeaded />}
          />
          <Route
            path="/plan-your-retirement/retirement-calculator"
            element={<RetirementCalculator />}
          />
          <Route
            path="/plan-your-retirement/peer-comparison"
            element={<PeerComparison />}
          />
          <Route path="/getting-started/demo-video" element={<VideoDemo />} />
          <Route path="/getting-started/faq" element={<FAQ />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
