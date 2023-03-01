import React from "react";

import Calculator from "../components/Calculator";
import Card from "../components/Card";
import PageContent from "../components/Layout/PageContent";
import MyAssets from "../components/MyAssets";
import { useStateContext } from "../context/ContextProvider";
import { formatAddress } from "../helpers";

const Home = () => {
  const { address } = useStateContext();

  if (!address)
    return (
      <Card>
        <div className="flex items-center justify-center">
          <div className="mt-20 font-bold">Please connect a wallet</div>
        </div>
      </Card>
    );

  return (
    <>
      <PageContent>
        {/* LHS - Your Assets */}
        <Card title={address && `${formatAddress(address)} assets`}>
          <MyAssets />
        </Card>

        {/* RHS - Yields (depends on assets) */}
        <Card title="Calculator">
          <Calculator />
        </Card>
      </PageContent>
    </>
  );
};

export default Home;
