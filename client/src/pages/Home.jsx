import React from "react";
import { useNetwork } from "wagmi";

import Calculator from "../components/Calculator";
import Card from "../components/Card";
import PageContent from "../components/Layout/PageContent";
import YieldDetailsModal from "../components/Modals/YieldDetailsModal";
import MyAssets from "../components/MyAssets";
import { useStateContext } from "../context/ContextProvider";
import { formatAddress } from "../helpers";

const Home = () => {
  const { address } = useStateContext();
  const { chain } = useNetwork();

  // If no address, show welcome message
  if (!address)
    return (
      <Card>
        <div className="flex items-center justify-center">
          <div className="mt-20 grid grid-cols-1">
            Welcome to Retire Decent! <br /> <br /> To start on your journey to
            retiring decently, <br /> <br />
            <span className="font-bold">Please connect a wallet</span>
          </div>
        </div>
      </Card>
    );

  // If address, show assets and calculator
  return (
    <>
      <YieldDetailsModal />
      <PageContent>
        {/* LHS - Your Assets */}
        <Card
          title={
            address &&
            `${formatAddress(
              address
            )}'s ${chain?.name?.toLowerCase()} wallet assets`
          }
        >
          <MyAssets />
        </Card>

        {/* RHS - Yields (depends on assets) */}
        <Card title="Retirement calculator">
          <Calculator />
        </Card>
      </PageContent>
    </>
  );
};

export default Home;
