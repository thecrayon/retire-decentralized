import { Box, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const Risk = () => {
  const [value, setValue] = useState("0");

  const onSelect = (e) => {
    setValue(e);
    window.localStorage.set("wizardRisk", e);
  };

  console.log("wizard radio value", value);
  //

  return (
    <Box>
      <Stack direction="column">
        <Text fontWeight={700} fontSize="lg">
          What is your risk tolerance?
        </Text>

        <RadioGroup onChange={onSelect} value={value} color="primary">
          <Stack direction="row">
            <Radio value="1">Low</Radio>
            <Radio value="2">Medium</Radio>
            <Radio value="3">High</Radio>
          </Stack>
        </RadioGroup>
      </Stack>
    </Box>
  );
};

export default Risk;
