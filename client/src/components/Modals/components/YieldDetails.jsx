import React from "react";
import { VscCheckAll } from "react-icons/vsc";
import { usePrepareContractWrite, useContractWrite } from "wagmi";

import { useStateContext } from "../../../context/ContextProvider";
import { formatNumber } from "../../../helpers";
import { styles } from "../../../styles";
import CustomCard from "../../CustomCard";
import { AAVEVV3ETHCONTRACTADDRESS } from "../../../constants";
import ABI from "../../../context/Web3/abi.json";

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
      <div className="text-right">{formatNumber(item?.apy)}</div>
    </div>
    <div className="grid grid-cols-2">
      <div className="font-bold">Illiquidity Risk</div>
      <div className="text-right">{item?.ilRisk}</div>
    </div>
  </div>
);

const YieldDetails = ({ data }) => {
  const { address } = useStateContext();

  console.log(AAVEVV3ETHCONTRACTADDRESS);

  // let amount = 0.0001eth
  let amount = 100000000000000000;

  const { config, error } = usePrepareContractWrite({
    address: AAVEVV3ETHCONTRACTADDRESS,
    abi: ABI,
    chainId: 1,
    // amount (ether), walletAddress, walletAddress(of person receiving aToken), referralCode // use 0 for development
    functionName: "supply",
    args: ["0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", amount, address, 0],
    enabled: Boolean(address),
  });

  const { write } = useContractWrite(config);

  console.log(write);
  console.log(error);

  return (
    <div className="container mx-auto font-poppins text-[14px]">
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
              disabled={item?.project !== "aave-v2"}
              onClick={() => write?.()}
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
