import React from "react";
import { Route, Routes } from "react-router-dom";

import {
  Navbar,
  VideoDemo,
  HowItWorks,
  WhereWeAreHeaded,
  RetirementCalculator,
  PeerComparison,
  FAQ,
  Footer,
} from "./components";

import { Home } from "./pages";

const App = () => {
  return (
    <div className="flex relative">
      <div className="fixed z-10 w-full">
        <Navbar />
      </div>

      <div className="mt-20 container mx-auto">
        <div className="min-h-screen">
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

        {/* footer */}
        <div className=" mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
