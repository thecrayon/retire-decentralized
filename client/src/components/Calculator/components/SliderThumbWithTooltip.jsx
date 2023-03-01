import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { useStateContext } from "../../../context/ContextProvider";

const SliderThumbWithTooltip = ({ name, xAxes, toolTip }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const { retirementCalculatorData, setRetirementCalculatorData } =
    useStateContext();

  const handleChange = (e) => {
    setRetirementCalculatorData({
      ...retirementCalculatorData,
      [name]: e,
    });
  };

  return (
    <Slider
      id={`slider-${name}`}
      name={name}
      value={retirementCalculatorData[name]}
      min={xAxes[0]}
      max={xAxes[2]}
      colorScheme="blue"
      onChange={handleChange}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderMark value={xAxes[0]} mt="1" ml="-2.5" fontSize="sm">
        {xAxes[0]}
      </SliderMark>
      <SliderMark value={xAxes[1]} mt="1" ml="-2.5" fontSize="sm">
        {xAxes[1]}
      </SliderMark>
      <SliderMark value={xAxes[2]} mt="1" ml="-2.5" fontSize="sm">
        {xAxes[2]}
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="blue.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${retirementCalculatorData[name]} ${toolTip}`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
};

export default SliderThumbWithTooltip;
