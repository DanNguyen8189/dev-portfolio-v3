// theme.js
// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({ 
  config,
  styles: {
    global: {
      body: {
        fontSize: "16px",
          // color: "gray.800",
          // _dark: {
          //   color: "gray.200",
          // },
      },
    },
  },
  colors: {
    brand: {
      50: "#E6FFFA",
      100: "#B2F5EA",
      200: "#81E6D9",
      300: "#4FD1C5",
      400: "#38B2AC",
      500: "#319795",
      600: "#2C7A7B",
      700: "#285E61",
      800: "#234E52",
      900: "#1D4044",
    },
  },
  semanticTokens: {
    colors: {
      appText: {
        default: "gray.800",
        _dark: "gray.300",
      },
      navText: {
        default: "brand.600",
        _dark: "brand.400",
      },
      navTextHover: {
        default: "white",
        _dark: "gray.900",
      },
      navButtonHover: {
        default: "brand.500",
        _dark: "brand.300",
      },
    },
  },
  components: {
    Button: {
      variants: {
        nav: {
          color: "navText",
          _hover: {
            color: "navTextHover",
            bg: "navButtonHover",
          },
        },
      },
    },
  },
});

export default theme;
