import { Flex } from "@chakra-ui/react";
import React from "react";

const PageContent = ({ children }) => {
  return (
    <Flex justify="center" p="20px 0px">
      <Flex
        width="100%"
        justify="center"
        maxWidth="860px"
        gap={{ base: 2 }}
        direction={{ base: "column", md: "row" }}
      >
        {/* LHS */}
        <Flex direction="column" width="100%" mr={{ base: 0, md: 6 }}>
          {children && children[0]}
        </Flex>

        {/* RHS */}
        <Flex direction="column" width="100%">
          {children && children[1]}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageContent;
