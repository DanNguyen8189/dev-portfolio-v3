import { extendTheme } from "@chakra-ui/react";

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
        fontSize: "15px",
        color: "appText",
        bg: "siteBG"
      },
    },
  },
  fonts: {
    headingCustom: "Poiret One, sans-serif",
  },
  fontSizes: {
    sectionHeading: "1.25rem"
  },
  colors: {
    brand: {
      50: "#E6FFFA",
      //100: "#B2F5EA",
      100: "#b8ece7",
      200: "#81E6D9",
      300: "#4FD1C5",
      400: "#38B2AC",
      500: "#319795",
      600: "#2C7A7B",
      700: "#285E61",
      800: "#234E52",
      900: "#1D4044",
    },
    brandAccent: {
      50: "#FFF7ED",
      100: "#FFEDD5",
      200: "#FED7AA",
      300: "#FDBA74",
      400: "#FB923C",
      500: "#F97316",
      600: "#EA580C",
      700: "#C2410C",
      800: "#9A2C0C",
      900: "#7C2D12",
    }
  },
  semanticTokens: {
    colors: {
      appText: {
        default: "brand.900",
        _dark: "brand.100",
      },
      navText: {
        default: "brand.600",
        _dark: "brand.400",
      },
      navTextHover: {
        default: "brand.900",
        _dark: "brandAccent.200",
      },
      navButtonHover: {
        default: "brand.200",
        _dark: "None",
      },
      siteBG: {
        default: "#99ecfe",
        _dark: "#142a3e"
      },
      cardBg: {
        default: "#c8f5ff",
        _dark: "#163952"
      },
      // cardText: {
      //   default: "brand.800",
      //   _dark: "brand.100"
      // },
      cardBorder: {
        default: "gray.200",
        _dark: "gray.600"
      },
      lightingModeText:{
        _dark: "brandAccent.300"
      },
      lightingModeButtonHover:{
        default: "brand.200",
        _dark: "brand.700"
      }
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
        lightingMode: {
          color: "lightingModeText",
          _hover: {
            bg: "lightingModeButtonHover"
          }
        },
        filterSelected :{
          color: ""
        },
        contact: {
          color: "appText",
          margin: "None",
          padding: "None",
          fontSize: "1.5rem",
        }
      },
    },
    // Card: {
    //   baseStyle: {
    //     container: {
    //       //bg: { default: "#49C6E5", _dark: "#163952"},
    //       bg: { default: "brand.700", _dark: "brand.800" },
    //       color: "appText",
    //       borderColor: "gray.700",
    //     },
    //   },
    // },
    Card: {
      baseStyle: {
        container: {
          bg: "cardBg",
          color: "appText",
          borderColor: "cardBorder",
        },
      },
    },
  },
});

export default theme;
