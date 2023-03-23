// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF#C00",
      primary: "#3b82f6",
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      },
    }),
  },
  components: {},
});
