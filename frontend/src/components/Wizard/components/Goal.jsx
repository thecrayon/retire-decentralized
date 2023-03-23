import { Box, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const Goal = () => {
  const [value, setValue] = useState("0");

  const onSelect = (e) => {
    setValue(e);
    window.localStorage.set("wizardGoal", e);
  };

  console.log("wizard radio value", value);
  //

  return (
    <Box>
      <Stack direction="column">
        <Text fontWeight={700} fontSize="lg">
          What is your goal?
        </Text>

        <RadioGroup onChange={onSelect} value={value} color="primary">
          <Stack direction="row">
            <Radio value="1">Retire</Radio>
            <Radio value="2">Sabbatical</Radio>
            <Radio value="3">Etc</Radio>
          </Stack>
        </RadioGroup>
      </Stack>
    </Box>
  );
};

export default Goal;
