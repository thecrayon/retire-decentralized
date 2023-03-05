import { Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { FaRegMoneyBillAlt } from "react-icons/fa";

import { formatDate } from "../../../helpers";
import CustomCard from "../../CustomCard";

const Deposit = ({ depositDate }) => {
  const date = formatDate(depositDate);

  return (
    <CustomCard title={`Deposit on ${date || "no date"}`}>
      <Stack>
        <Flex direction="row" align="center" justify="left">
          <FaRegMoneyBillAlt
            className=" text-lg"
            style={{ color: "rgb(22 163 74)" }}
          />
          {/* deposit details */}
          <Flex direction="row">
            <div></div>
          </Flex>
        </Flex>
      </Stack>
    </CustomCard>
  );
};

export default Deposit;
