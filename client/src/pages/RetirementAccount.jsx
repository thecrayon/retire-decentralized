import React, { useEffect, useState } from "react";

import CustomCard from "../components/CustomCard";
import PageContent from "../components/Layout/PageContent";
import SwitchNetworkModal from "../components/Modals/SwitchNetworkModal";
import EmployeeRetireView from "../components/Retire/EmployeeRetireView";
import EmployerRetireView from "../components/Retire/EmployerRetireView";
import { useStateContext } from "../context/ContextProvider";

const RetirementAccount = () => {
  const [open, setOpen] = useState(false);
  const { chain } = useStateContext();

  useEffect(() => {
    if (chain.name !== "Avalanche Fuji") setOpen(true);
    return () => setOpen(false);
  }, [chain]);

  return (
    <>
      <SwitchNetworkModal
        open={open}
        title="Switch To Avalanche Fuji Testnet"
        chainId={43113}
      />
      <PageContent>
        {/* LHS - Employer Deposit */}
        <CustomCard title="Deposit- Employer 401k">
          {/* <EmployerDeposit /> */}
          <EmployerRetireView />
        </CustomCard>

        {/* RHS - Employer Retirement View Deposits */}
        <CustomCard title="Previous Deposits- Employer 401k">
          <EmployeeRetireView />
        </CustomCard>
      </PageContent>
    </>
  );
};

export default RetirementAccount;
