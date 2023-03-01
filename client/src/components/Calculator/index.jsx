import { Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";

import { RiQuestionLine } from "react-icons/ri";
import SliderThumbWithTooltip from "./components/SliderThumbWithTooltip";
import { useStateContext } from "../../context/ContextProvider";

const Calculator = () => {
  const { retirementCalculatorData } = useStateContext();

  return (
    <div className="grid grid-cols-1 gap-10">
      <div>
        <div className="flex items-center">
          <h2 className="text-[14px] font-poppins">years</h2>
          <Tooltip
            hasArrow
            label="years until retirement"
            bg="blue.500"
            color="white"
            shouldWrapChildren
            placement="top"
          >
            <RiQuestionLine className="text-xs mb-2 hover:opacity-50 hover:cursor-pointer" />
          </Tooltip>
        </div>
        <SliderThumbWithTooltip
          name="yearsUntilRetire"
          xAxes={[25, 50, 75]}
          toolTip="years"
        />
      </div>
      <div>
        <div className="flex items-center">
          <h2 className="text-[14px] font-poppins">apy</h2>
          <Tooltip
            hasArrow
            label="annual percentage yield"
            bg="blue.500"
            color="white"
            shouldWrapChildren
            placement="top"
          >
            <RiQuestionLine className="text-xs mb-2 hover:opacity-50 hover:cursor-pointer" />
          </Tooltip>
        </div>
        <SliderThumbWithTooltip
          name="annualReturnRate"
          xAxes={[0, 50, 100]}
          toolTip="% apy"
        />
      </div>

      <div className="grid grid-cols-1 font-poppins text-[14px]">
        <p>
          with a current portfolio value of{" "}
          <span className="font-bold">
            $
            {retirementCalculatorData?.totalValueOfAllTokensInWallet?.toFixed(
              2
            )}{" "}
          </span>{" "}
          and an annual percentage yield of{" "}
          <span className="font-bold">
            {retirementCalculatorData?.annualReturnRate}%{" "}
          </span>{" "}
          you will have a future portfolio value of{" "}
          <span className="font-bold">
            {" "}
            $
            {(
              retirementCalculatorData?.totalValueOfAllTokensInWallet *
              (1 + retirementCalculatorData?.annualReturnRate / 100) **
                retirementCalculatorData?.yearsUntilRetire
            ).toLocaleString("en", {
              useGrouping: true,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>{" "}
          in{" "}
          <span className="font-bold">
            {" "}
            {retirementCalculatorData?.yearsUntilRetire}{" "}
          </span>{" "}
          years
        </p>
      </div>
    </div>
  );
};

export default Calculator;
