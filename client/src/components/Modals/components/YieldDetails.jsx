import { Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";

import { useStateContext } from "../../../context/ContextProvider";
import { styles } from "../../../styles";
import { formatNumber } from "../../../helpers";

// TODO: finish this component
// contract_name
// contract_ticker_symbol
// logo_url
// balance
// quote

// defiYieldOptionsForToken // array of objects (3 objects)
// for each object breakout:
// project
// tvlUsd
// apy
// apyPct30D
// ilRisk // illiquidity risk? can see right away

const ProtocolYieldOption = (props) => {
  console.log(props?.tvlUsd);

  return (
    <div key={props.project}>
      <div className="grid grid-cols-2">
        <div className="font-bold">Protocol</div>
        <div className="text-right">{props?.project}</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="font-bold">TVL</div>
        <div className="text-right">{formatNumber(props?.tvlUsd)}</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="font-bold">APY 30D</div>
        <div className="text-right">{formatNumber(props?.apyPct30D)}</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="font-bold">IL Risk</div>
        <div className="text-right">{props?.ilRisk}</div>
      </div>
    </div>
  );
};

const YieldDetails = () => {
  const { yieldDetailsModal } = useStateContext();
  const { data } = yieldDetailsModal;

  return (
    // <div className="container grid grid-cols-4 grid-flow-row items-center justify-center">
    //   <Image
    //     src={data?.logo_url}
    //     alt={`${data?.contract_ticker_symbol} logo`}
    //     className="object-contain rounded-full w-[50px] h-[50px]"
    //     filter="invert(100%)"
    //   />

    <div className="container mx-auto grid grid-cols-1">
      <h2 className="font-semibold font-poppins text-[16px]">{`Yield details for ${data?.contract_ticker_symbol}`}</h2>

      {/* data */}
      <div className="grid grid-cols-1 gap-10 w-full text-[14px] mt-5">
        {data?.defiYieldOptionsForToken?.map((item, index) => (
          <div
            className={`${
              index !== data?.defiYieldOptionsForToken?.length && "mb-3"
            }`}
          >
            {/* display yield details for each protocol */}
            <ProtocolYieldOption key={index} {...item} />
            {/* give user option to deposit with that protocol */}
            <button
              name={`${data?.defiYieldOptionsForToken?.project}`}
              className={`mt-5 ${styles.primaryButton} w-full capitalize`}
            >
              Deposit with {item?.project}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YieldDetails;
