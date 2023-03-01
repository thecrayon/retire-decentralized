import React from "react";

import Card from "../components/Card";
import PageContent from "../components/Layout/PageContent";
import MyAssets from "../components/MyAssets";
import { useStateContext } from "../context/ContextProvider";
import { formatAddress } from "../helpers";

const Home = () => {
  const { address } = useStateContext();
  return (
    <>
      <PageContent>
        {/* LHS - Your Assets */}
        <Card title={address && `${formatAddress(address)} assets`}>
          <MyAssets />
        </Card>

        {/* RHS - Yields (depends on assets) */}
        <Card title="yields"></Card>
      </PageContent>
    </>
  );
};

export default Home;
