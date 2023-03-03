import { Spinner } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="#3b82f6"
      size="xl"
    />
  );
};

export default Loader;
