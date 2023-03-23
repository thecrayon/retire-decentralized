import { Image } from "@chakra-ui/react";
import React from "react";

import AvalancheLogo from "../../../assets/avalanche-avax-logo.png";
import {
  convertToLocalTime,
  decodeDepositData,
  formatAddress,
  formatBalance,
  formatNumber,
} from "../../../helpers";
import { styles } from "../../../styles";
import CustomCard from "../../CustomCard";

const Deposit = ({ depositDate, ...tx }) => {
  const receiverAddress = decodeDepositData(tx.log_events[0].raw_log_data);

  const handleViewTxReceipt = () => {
    window.open(`https://testnet.snowtrace.io/tx/${tx.tx_hash}`, "_blank");
  };
  return (
    <CustomCard>
      <div className="font-poppins">
        {/* logo / asset name */}
        <div className="flex flex-row items-center space-x-5">
          <div style={{ backgroundColor: "white" }}>
            <Image
              src={AvalancheLogo}
              alt="avalanche logo"
              className="object-contain rounded-full w-[50px] h-[50px]"
            />
          </div>
          <div className="grid grid-cols-1 grid-rows-2 gap-0.5">
            <h2 className="font-semibold">AVAX</h2>
            <h3 className="text-sm">Avalanche</h3>
          </div>
        </div>

        {/* To address */}
        <div className="mt-5 grid grid-cols-2 grid-rows-1 w-full text-[14px]">
          <h3 className="font-bold">To</h3>
          <div className="text-right">
            {formatAddress(receiverAddress?.[1])}
          </div>
        </div>
        {/* total usd amount (including gas. minimal on avalanche) */}
        <div className="mt-5 grid grid-cols-2 grid-rows-1 w-full text-[14px]">
          <h3 className="font-bold">USD Total</h3>
          <div className="text-right">${formatNumber(tx?.value_quote)}</div>
        </div>
        {/* Avax amount */}
        <div className="mt-5 grid grid-cols-2 grid-rows-1 w-full text-[14px]">
          <h3 className="font-bold">Amount</h3>
          <div className="text-right">{formatBalance(tx?.value, 18)} avax</div>
        </div>
        {/* tx date */}
        <div className="mt-5 grid grid-cols-2 grid-rows-1 w-full text-[14px]">
          <h3 className="font-bold">Time</h3>
          <div className="text-right">
            {convertToLocalTime(tx?.block_signed_at)}
          </div>
        </div>
        <button
          className={`mt-5 ${styles.secondaryButton} w-full`}
          onClick={handleViewTxReceipt}
          name="details"
        >
          View Receipt
        </button>
      </div>
    </CustomCard>
  );
};

export default Deposit;
