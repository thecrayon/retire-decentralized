import React from "react";
import { useNetwork } from "wagmi";

import Calculator from "../components/Calculator";
import CustomCard from "../components/CustomCard";
import PageContent from "../components/Layout/PageContent";
import YieldDetailsModal from "../components/Modals/YieldDetailsModal";
import MyAssets from "../components/MyAssets";
import { useStateContext } from "../context/ContextProvider";
import { formatAddress } from "../helpers";

const Home = () => {
  const { address } = useStateContext();
  const { chain } = useNetwork();

  return (
    <>
      <YieldDetailsModal />
      <PageContent>
        {/* LHS - User Wallet Assets */}
        <CustomCard
          title={
            address &&
            `${formatAddress(
              address
            )}'s ${chain?.name?.toLowerCase()} wallet assets`
          }
        >
          <MyAssets />
        </CustomCard>

        {/* RHS - Calculator */}
        <CustomCard title="Retirement calculator">
          <Calculator />
        </CustomCard>
      </PageContent>
    </>
  );
};

export default Home;
