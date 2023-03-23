import { Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiQuestionLine } from "react-icons/ri";

import { useStateContext } from "../../context/ContextProvider";
import SliderThumbWithTooltip from "./components/SliderThumbWithTooltip";
import { calculateEndDate, formatNumber } from "../../helpers";

const Calculator = () => {
  const { retirementCalculatorData } = useStateContext();
  const [futureValue, setFutureValue] = useState(0);

  const calculateFutureValue = () => {
    // if monthlyYield === 0 then sum tokens in wallet + monthly contributions
    if (retirementCalculatorData.annualReturnRate === 0) {
      const totalMonths = retirementCalculatorData.yearsUntilRetire * 12;
      const futureValue =
        retirementCalculatorData?.totalValueOfAllTokensInWallet +
        retirementCalculatorData.monthlyContribution * totalMonths;
      return futureValue;
    }

    const monthlyYield =
      Number(retirementCalculatorData.annualReturnRate) / 100 / 12;
    const totalMonths = retirementCalculatorData.yearsUntilRetire * 12;
    const futureValue =
      retirementCalculatorData?.totalValueOfAllTokensInWallet *
        (1 + monthlyYield) ** totalMonths +
      (retirementCalculatorData.monthlyContribution *
        ((1 + monthlyYield) ** totalMonths - 1)) /
        monthlyYield;
    return futureValue;
  };

  useEffect(() => {
    const res = calculateFutureValue();
    if (res === Infinity || res === -Infinity || isNaN(res)) {
      setFutureValue(0);
      return;
    }
    // format to two decimals and commas
    setFutureValue(formatNumber(res));
  }, [retirementCalculatorData]);

  return (
    <div className="mx-4">
      <div className="mx-4">
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
            toolTip="% apy compounded monthly"
          />
        </div>

        <div className="mt-5">
          <div className="flex items-center">
            <h2 className="text-[14px] font-poppins">monthly contribution</h2>
            <Tooltip
              hasArrow
              label="monthly contribution"
              bg="#3b82f6"
              color="white"
              shouldWrapChildren
              placement="top"
            >
              <RiQuestionLine className="text-xs mb-2 hover:opacity-50 hover:cursor-pointer" />
            </Tooltip>
          </div>
          <SliderThumbWithTooltip
            name="monthlyContribution"
            xAxes={[0, 5000, 10000]}
            toolTip="monthly contribution"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 font-poppins text-[14px] mt-10">
        {/* TODO: clean this up. hard to read now*/}
        <p className="leading-7 mx-2">
          Your token balance of{" "}
          <span className="font-bold">
            $
            {formatNumber(
              retirementCalculatorData?.totalValueOfAllTokensInWallet
            )}
            ,{" "}
          </span>{" "}
          <span>
            with a{" "}
            <span className="font-bold">
              ${formatNumber(retirementCalculatorData?.monthlyContribution)}
              /month
            </span>{" "}
            contribution,{" "}
          </span>
          at an annual rate of return of{" "}
          <span className="font-bold">
            {retirementCalculatorData?.annualReturnRate}%,
            <Tooltip
              hasArrow
              label="compounded monthly"
              bg="#3b82f6"
              color="white"
              shouldWrapChildren
              placement="top"
            >
              <RiQuestionLine className="text-xs mb-2 hover:opacity-50 hover:cursor-pointer" />
            </Tooltip>{" "}
          </span>{" "}
          will be worth{" "}
          <span className="font-bold underline underline-offset-4">
            {" "}
            ${futureValue}
          </span>{" "}
          in{" "}
          <span className="font-bold">
            {" "}
            {retirementCalculatorData?.yearsUntilRetire}{" "}
          </span>{" "}
          years{" "}
          <span className="font-bold">
            ({calculateEndDate(retirementCalculatorData?.yearsUntilRetire)}).
          </span>
        </p>
      </div>
    </div>
  );
};

export default Calculator;
