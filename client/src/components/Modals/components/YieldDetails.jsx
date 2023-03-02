import React from "react";

import { useStateContext } from "../../../context/ContextProvider";
import { formatNumber } from "../../../helpers";
import { styles } from "../../../styles";
import { VscCheckAll } from "react-icons/vsc";
import CustomCard from "../../CustomCard";

const RecommendedProtocol = () => (
  <div className="flex flex-row gap-3 font-poppins items-center justify-center mb-2">
    <VscCheckAll className="text-primary" />
    <div className="text-orange-500 text-md">recommended by retire decent</div>
    <VscCheckAll className="text-primary" />
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
      <div className="text-right">{formatNumber(item?.apy)}</div>
    </div>
    <div className="grid grid-cols-2">
      <div className="font-bold">Illiquidity Risk</div>
      <div className="text-right">{item?.ilRisk}</div>
    </div>
  </div>
);

const YieldDetails = ({ data }) => {
  return (
    <div className="w-4/5 container mx-auto font-poppins text-[14px]">
      {data?.defiYieldOptionsForToken?.map((item, index) => (
        <CustomCard>
          <div
            key={index}
            className={`${
              index === 0 && "ring-2 ring-orange-500 ring-offset-8"
            }`}
          >
            {/* recommended first option because it has the highest TVL */}
            <div className={`${index !== 0 && "invisible"}`}>
              <RecommendedProtocol />
            </div>
            {/* display yield details for each protocol */}
            <ProtocolYieldOption key={index} index={index} {...item} />
            {/* give user option to deposit with that protocol */}
            <button
              name={`${data?.defiYieldOptionsForToken?.project}`}
              className={`mt-5 ${styles.primaryButton} w-full capitalize`}
            >
              Deposit with {item?.project}
            </button>
          </div>
        </CustomCard>
      ))}
    </div>
  );
};

export default YieldDetails;
