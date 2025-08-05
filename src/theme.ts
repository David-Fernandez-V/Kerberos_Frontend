// src/theme/index.ts
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Configura el modo oscuro por defecto
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  colors: {
    gray: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b",
      950: "#111111",
    },
    red: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#991919",
      800: "#511111",
      900: "#300c0c",
      950: "#1f0808",
    },
    purple: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#641ba3",
      800: "#4a1772",
      900: "#2f0553",
      950: "#1a032e",
    },
    teal: {
      50: "#f0fdfa",
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#14b8a6",
      600: "#0d9488",
      700: "#0c5d56",
      800: "#114240",
      900: "#032726",
      950: "#021716",
    }
  },
  components: {
    Button: {
      baseStyle: {
        _focus: { boxShadow: "none" },
      },
      variants: {
        solid: {
          bg: "purple.700",
          color: "white",
          borderRadius: "20",
          _hover: { bg: "purple.600" , color: "gray.50"},
          _active: {bg: "purple.800"}
        },
      },
    },
    Select: {
      variants: {
        outline: {
          field: {
            borderWidth: "2px",
            borderColor: "purple.700",
            _hover: { borderColor: "purple.600" },
            _focus: {
              borderColor: "purple.600",
              boxShadow: "0 0 0 1px #805AD5",
            },
            _focusVisible: {
              borderColor: "purple.600",
              boxShadow: "0 0 0 1px #805AD5",
            },
          },
        },
        flushed: {
          field: {
            borderColor: "purple.700",
            borderBottomWidth: "2px",
            borderRadius: 0,
            _hover: {
              borderColor: "purple.600",
            },
            _focus: {
              borderColor: "purple.600",
              boxShadow: "0 1px 0 0 purple.600",
            },
            _focusVisible: {
              borderColor: "purple.600",
              boxShadow: "0 1px 0 0 purple.600",
            },
          },
        },
      },
    },
    Textarea: {
      variants: {
        outline: {
          borderWidth: "2px",
          borderColor: "purple.700",
          _hover: { borderColor: "purple.600" },
          _focus: {
            borderColor: "purple.600",
            boxShadow: "0 0 0 1px #805AD5",
          },
          _focusVisible: {
            borderColor: "purple.600",
            boxShadow: "0 0 0 1px #805AD5",
          },
        },
        flushed: {
          borderColor: "purple.700",
          borderBottomWidth: "2px",
          borderRadius: 0,
          _hover: {
            borderColor: "purple.600",
          },
          _focus: {
            borderColor: "purple.600",
            boxShadow: "0 1px 0 0 purple.600",
          },
          _focusVisible: {
            borderColor: "purple.600",
            boxShadow: "0 1px 0 0 purple.600",
          },
        },
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          _checked: {
            bg: "purple.700",
            borderColor: "purple.700",
            color: "white", // color del check (ícono)
            _hover: {
              bg: "purple.600",
              borderColor: "purple.600",
            },
          },
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderWidth: "2px",
            borderRadius: "20",
            borderColor: "purple.800",
            _hover: { borderColor: "purple.600" },
            _focus: { borderColor: "purple.600", boxShadow: "0 0 0 1px #805AD5" },
            _focusVisible: {
              borderColor: "purple.600",
              boxShadow: "0 0 0 1px #805AD5",
            },
          },
        },
        flushed: {
          field: {
            borderColor: "purple.700",
            borderBottomWidth: "2px", // por defecto 1px, aquí aumentamos
            borderRadius: 0,
            _hover: {
              borderColor: "purple.600",
            },
            _focus: {
              borderColor: "purple.600",
              boxShadow: "0 1px 0 0 purple.600",
            },
            _focusVisible: {
              borderColor: "purple.600",
              boxShadow: "0 1px 0 0 purple.600",
            },
          },
        }
      },
    },
    NumberInput: {
      variants: {
        outline: {
          field: {
            borderWidth: "2px",
            borderRadius: "20",
            borderColor: "purple.800",
            _hover: { borderColor: "purple.600" },
            _focus: { borderColor: "purple.600", boxShadow: "0 0 0 1px #805AD5" },
            _focusVisible: {
              borderColor: "purple.600",
              boxShadow: "0 0 0 1px #805AD5",
            },
          },
        },
        flushed: {
          field: {
            borderColor: "purple.700",
            borderBottomWidth: "2px", // por defecto 1px, aquí aumentamos
            borderRadius: 0,
            _hover: {
              borderColor: "purple.600",
            },
            _focus: {
              borderColor: "purple.600",
              boxShadow: "0 1px 0 0 purple.600",
            },
            _focusVisible: {
              borderColor: "purple.600",
              boxShadow: "0 1px 0 0 purple.600",
            },
          },
        }
      },
    },
    Table: {
      baseStyle: {
        th: {
          borderBottom: "2px solid",
          borderColor: "gray.200",
        },
        td: {
          borderBottom: "2px solid",
          borderColor: "gray.200",
        },
      },
    },
    Divider: {
      baseStyle: {
        borderWidth: "1px",
        borderColor: "gray.300"
      }
    },
  },
});

export default theme;