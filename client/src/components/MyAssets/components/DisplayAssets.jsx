import { Image } from "@chakra-ui/react";
import React from "react";

import { useStateContext } from "../../../context/ContextProvider";
import { formatBalance } from "../../../helpers";
import { styles } from "../../../styles";
import Card from "../../Card";

const DisplayAssets = (props) => {
  const { setDrawerOpen, drawerOpen, setYieldDetailsModal } = useStateContext();

  const handleOpenModal = () => {
    setYieldDetailsModal((prev) => ({
      ...prev,
      isOpen: true,
      data: props,
    }));
  };

  const getMinAndMaxApy = (apyObj) => {
    const apyArray = apyObj.map((apy) => apy.apy);
    const minApy = Math.min(...apyArray);
    const maxApy = Math.max(...apyArray);
    return { minApy, maxApy };
  };

  return (
    <Card title="">
      <div className="grid grid-cols-1 font-poppins justify-end">
        {/* logo / asset name */}
        <div className="flex flex-row items-center space-x-5">
          <div style={{ backgroundColor: "white" }}>
            <Image
              src={props?.logo_url}
              alt={`${props?.contract_ticker_symbol} logo`}
              className="object-contain rounded-full w-[50px] h-[50px]"
              filter="invert(100%)"
            />
          </div>
          <div className="grid grid-cols-1 grid-rows-2 gap-0.5">
            <h2 className="font-semibold">{props?.contract_ticker_symbol}</h2>
            <h3 className="text-sm">{props?.contract_name}</h3>
          </div>
        </div>

        {/* Quantity */}
        <div className="mt-5 grid grid-cols-2 grid-rows-1 w-full text-[14px]">
          <h3 className="font-bold">Quantity</h3>
          <div className="text-right">
            {formatBalance(props?.balance, props?.contract_decimals)}
          </div>
        </div>
        {/* USD Balance */}
        <div className="mt-5 grid grid-cols-2 grid-rows-1 w-full text-[14px]">
          <h3 className="font-bold">USD Balance</h3>
          <div className="text-right">${props?.quote?.toFixed(2)}</div>
        </div>
        {/* asset apy */}
        <div className="mt-5 grid grid-cols-2 grid-rows-1 w-full text-[14px]">
          <div>
            <h3 className="font-bold">Apy</h3>
          </div>
          <div className="flex flex-col">
            <div className="text-right">
              {getMinAndMaxApy(
                props?.defiYieldOptionsForToken
              )?.minApy?.toFixed(2)}{" "}
              -{" "}
              {getMinAndMaxApy(
                props?.defiYieldOptionsForToken
              )?.maxApy?.toFixed(2)}
              %
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 grid-rows-1 gap-3 mt-2">
          {/* button to get more details about yields on token  */}
          <button
            className={`mt-5 ${styles.secondaryButton}`}
            onClick={handleOpenModal}
            name="details"
          >
            Details
          </button>
        </div>
        <div className="mt-3 border border-b border-gray-300" />
      </div>
    </Card>
  );
};

export default DisplayAssets;
