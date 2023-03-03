import React from "react";
import { VscCheckAll } from "react-icons/vsc";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { useDebounce } from "use-debounce";
import { utils, ethers } from "ethers";

import { useStateContext } from "../../../context/ContextProvider";
import { formatNumber } from "../../../helpers";
import { styles } from "../../../styles";
import CustomCard from "../../CustomCard";
import { AAVEVV3ETHCONTRACTADDRESS } from "../../../constants";
import AaveABI from "../../../context/Web3/abi.json";

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
  const { address } = useStateContext();

  async function payWithMetamask() {
    let ethereum = window.ethereum;

    // Request account access if needed
    await ethereum.enable();

    console.log("infura key", process.env.REACT_APP_INFURA_API_KEY);

    // const provider = new ethers.providers.JsonRpcProvider(
    //   `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`
    // );
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const aaveContract = new ethers.Contract(
      AAVEVV3ETHCONTRACTADDRESS,
      AaveABI,
      signer
    );

    const amountToDeposit = ethers.utils.parseEther("0.001")._hex; // deposit 1 ETH
    const depositTx = await aaveContract.depositETH(
      "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
      address,
      0,
      { value: amountToDeposit }
    );
    await depositTx.wait();
  }

  // wagmi sucks
  // const [amount, setAmount] = React.useState("");
  // const [debouncedAmount] = useDebounce(amount, 500);
  // const { config, error } = usePrepareContractWrite({
  //   address: AAVEVV3ETHCONTRACTADDRESS,
  //   abi: ABI,
  //   chainId: 1,
  //   // amount (ether), walletAddress, walletAddress(of person receiving aToken), referralCode // use 0 for development
  //   functionName: "depositETH",
  //   value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
  //   args: [
  //     "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
  //     "0x8a9e0C25953aCf7232714C466289BEEC0bE1D579",
  //     0,
  //   ],
  //   enabled: Boolean(amount),
  // });

  // const { write } = useContractWrite(config);

  // depositEth // contract address: 0xD322A49006FC828F9B5B37Ab215F99B4E5caB19C // abi: in separate file
  // function name: depositETH
  // 1. address: 0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2
  // 2. address: 0x8a9e0C25953aCf7232714C466289BEEC0bE1D579 // on behalf of
  // 3. uint16: referral code: 0

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
              onClick={() => payWithMetamask()}
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
