import { Button } from "@chakra-ui/react";
import React from "react";

import CustomCard from "../components/CustomCard";
import EmployeeRetireView from "../components/Retire/EmployeeRetireView";
import EmployerDeposit from "../components/EmployerDeposit";
import EmployerRetireView from "../components/Retire/EmployerRetireView";
import PageContent from "../components/Layout/PageContent";
import useRetirementAccount from "../hooks/useRetirementAccount";
const RetirementAccount = () => {
  return (
    <PageContent>
      {/* LHS - Employer Deposit */}
      <CustomCard title="Employer 401k Deposit">
        {/* <EmployerDeposit /> */}
        <EmployerRetireView />
      </CustomCard>

      {/* RHS - Employee 401k Account Balance and transaction summaries */}

      <CustomCard title="Employee 401k View">
        <EmployeeRetireView />
      </CustomCard>
    </PageContent>
  );
};

export default RetirementAccount;
