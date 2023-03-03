import { Tooltip } from "@chakra-ui/react";
import React from "react";

import { RiQuestionLine } from "react-icons/ri";
import { useStateContext } from "../../context/ContextProvider";
import SliderThumbWithTooltip from "./components/SliderThumbWithTooltip";
import { calculateEndDate } from "../../helpers";

const Calculator = () => {
  const { retirementCalculatorData } = useStateContext();

  return (
    <div className="mx-2">
      <div>
        <div className="flex items-center">
          <h2 className="text-[14px] font-poppins">years</h2>
          <Tooltip
            hasArrow
            label="years until retirement"
            bg="#3b82f6"
            color="white"
            shouldWrapChildren
            placement="top"
          >
            <RiQuestionLine className="text-xs mb-2 hover:opacity-50 hover:cursor-pointer" />
          </Tooltip>
        </div>
        <SliderThumbWithTooltip
          name="yearsUntilRetire"
          xAxes={[0, 25, 50]}
          toolTip="years"
        />
      </div>
      <div className="mt-5">
        <div className="flex items-center">
          <h2 className="text-[14px] font-poppins">apy</h2>
          <Tooltip
            hasArrow
            label="annual percentage yield"
            bg="#3b82f6"
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

      <div className="grid grid-cols-1 font-poppins text-[14px] mt-10">
        {/* TODO: clean this up. hard to read now*/}
        <p>
          your token balance of{" "}
          <span className="font-bold">
            $
            {retirementCalculatorData?.totalValueOfAllTokensInWallet?.toFixed(
              2
            )}{" "}
          </span>{" "}
          at an annual rate of return of{" "}
          <span className="font-bold">
            {retirementCalculatorData?.annualReturnRate}%{" "}
          </span>{" "}
          will be worth{" "}
          <span className="font-bold underline underline-offset-4">
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
          years{" "}
          <span className="font-bold">
            ({calculateEndDate(retirementCalculatorData?.yearsUntilRetire)})
          </span>
        </p>
      </div>
    </div>
  );
};

export default Calculator;
