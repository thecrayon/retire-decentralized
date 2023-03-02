import React from "react";

import { useStateContext } from "../../../context/ContextProvider";
import { formatNumber } from "../../../helpers";
import { styles } from "../../../styles";
import { VscCheckAll } from "react-icons/vsc";

const RecommendedProtocol = () => (
  <div className="flex flex-row gap-3 font-poppins items-center justify-center">
    <VscCheckAll className="text-primary text-[18px]" />
    <div className="text-orange-500 text-md">recommended by retire decent</div>
    <VscCheckAll className="text-primary text-[18px]" />
  </div>
);

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
const ProtocolYieldOption = (props) => (
  <div key={props.project} className="">
    <div className="grid grid-cols-2">
      <div className="font-bold">Protocol</div>
      <div className="text-right">{props?.project}</div>
    </div>
    <div className="grid grid-cols-2">
      <div className="font-bold">TVL</div>
      <div className="text-right">{formatNumber(props?.tvlUsd)}</div>
    </div>
    <div className="grid grid-cols-2">
      <div className="font-bold">APY</div>
      <div className="text-right">{formatNumber(props?.apy)}</div>
    </div>
    <div className="grid grid-cols-2">
      <div className="font-bold">IL Risk</div>
      <div className="text-right">{props?.ilRisk}</div>
    </div>
  </div>
);

const YieldDetails = () => {
  const { yieldDetailsModal } = useStateContext();
  const { data } = yieldDetailsModal;

  return (
    <div className="container mx-auto grid grid-cols-1">
      <div className="font-semibold font-poppins text-[16px]">{`Yield details for ${data?.contract_ticker_symbol}`}</div>

      {/* data */}
      <div className="grid grid-cols-1 gap-10 w-full text-[14px] mt-5">
        {data?.defiYieldOptionsForToken?.map((item, index) => (
          <div
            key={index}
            className={`${
              index !== data?.defiYieldOptionsForToken?.length && "mb-3"
            } `}
          >
            {/* recommended first option because it has the highest TVL */}
            <div className={`${index !== 0 && "invisible"}`}>
              <RecommendedProtocol />
            </div>
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
