import { Alert, AlertIcon, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { VscCheckAll } from "react-icons/vsc";

import { formatNumber } from "../../../helpers";
import useDepositOnAave from "../../../hooks/useDepositOnAave";
import { styles } from "../../../styles";
import CustomCard from "../../CustomCard";

const RecommendedProtocol = () => (
  <div className="flex flex-row gap-3 font-poppins items-center justify-center mb-2">
    <VscCheckAll className="text-primary" />
    <div className="text-orange-500 text-md">recommended by regen</div>
    <VscCheckAll className="text-primary" />
  </div>
);

const ProtocolYieldOption = ({ index, ...item }) => (
  <div key={item.project}>
    <div className="grid grid-cols-2 text-[14px]">
      <div className="font-bold">Protocol</div>
      <div className="text-right">{item?.project}</div>
    </div>
    <div className="grid grid-cols-2">
      <div className="font-bold">TVL</div>
      <div className="text-right">{formatNumber(item?.tvlUsd)}</div>
    </div>
    <div className="grid grid-cols-2">
      <div className="font-bold">APY</div>
      <div className="text-right">{formatNumber(item?.apy)}%</div>
    </div>
    <div className="grid grid-cols-2">
      <div className="font-bold">Illiquidity Risk</div>
      <div className="text-right">{item?.ilRisk}</div>
    </div>
  </div>
);

const YieldDetails = ({ data }) => {
  const { depositETHOnAave, loading } = useDepositOnAave();
  const [clickedButtonIndex, setClickedButtonIndex] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const handleDepositClicked = async ({buttonIndex, projectName}) => {
    console.log("buttonIndex", buttonIndex)
    console.log("projectName", projectName)
    setClickedButtonIndex(buttonIndex);
    if (projectName !== "aave-v2") {
      setErrorMessage("Only Eth on Aave V2 is supported at the moment");
      setClickedButtonIndex();
      return;
    }

    setErrorMessage("");


    await depositETHOnAave();
  };
  return (
    <div className="container mx-auto font-poppins text-[14px]">
      {errorMessage && (
      <Alert status='error'>
        <AlertIcon />
        {errorMessage}
      </Alert>
      )}
      {data?.defiYieldOptionsForToken?.map((item, index) => (
        <CustomCard>
          <div
            key={index}
            className={`${
              index === 0 && "ring-2 ring-orange-500 ring-offset-8"
            }`}
          >
            {/* recommended first option because it has the highest TVL */}
            {index === 0 && <RecommendedProtocol />}

            {/* display yield details for each protocol */}
            <ProtocolYieldOption key={index} index={index} {...item} />
            {/* give user option to deposit with that protocol */}
            <Button
              name={`${item?.project}`}
              backgroundColor="#3b82f6"
              width="full"
              mt={2}
              color="white"
              disabled={item?.project !== "aave-v2"}
              onClick={() => handleDepositClicked({buttonIndex: index, projectName: item?.project})}
              isLoading={loading && index === clickedButtonIndex}
            >
              <span className="capitalize">Deposit with {item?.project}</span>
            </Button>
          </div>
        </CustomCard>
      ))}
    </div>
  );
};

export default YieldDetails;
