import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#8B7FE6",
      light: "#D1CCF5",
    },
    text: {
      primary: "#1B1645",
      secondary:"#342D69"
    },
    background: {
      paper: "#F3F2FD",
    },
    grey: {
      50: "#F7F7F7",
      100: "#F5F5F5",
      200: "#E5E5E5",
      300: "#D4D4D4",
      400: "#A3A3A3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    gold: {
      main: "#FFB400",
    },
  },
  typography: {
    fontFamily: "dana",
    body2: {
      color: "#00000099",
    },
    button: {
      textTransform: "none",
    },
    customBold: {
      fontWeight: 500,
      fontSize: "18px",
    },
    custom: {
      fontWeight: 400,
      fontSize: "18px",
    },

    subtitle1: {
      "@media (max-width:768px)": {
        fontSize: "14px",
      },
    },
    subtitle2: {
      "@media (max-width:768px)": {
        fontSize: "12px",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        sizeMedium: {
          height: "56px",
          borderRadius: "8px",
        },
        startIcon: {
          // The marginRight and marginLeft properties are adjusted to ensure proper spacing in RTL layouts.
          marginRight: "auto",
          marginLeft: "8px",
        },
        endIcon: {
          // The marginRight and marginLeft properties are adjusted to ensure proper spacing in RTL layouts.
          marginLeft: "auto",
          marginRight: "8px",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiButtonBase-root .MuiTab-iconWrapper": {
            // The marginRight and marginLeft properties are adjusted to ensure proper spacing in RTL layouts.
            marginLeft: "8px",
            marginRight: "8px",
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          customBold: "customBold",
          custom: "custom",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          // padding:"0 14px",
          "& .MuiOutlinedInput-notchedOutline": {
            border: `0.5px solid #E8E5FA`,
          },
        },
        input: {
          margin: "0 14px",
          // padding:"16.5 0!"
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          margin: 0,
          padding: "10px 10px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        // input:{
        //   margin:"0 14px",
        //   padding:"16.5 0"
        // }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // border: `0.5px solid #E8E5FA`,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)", // باکس شادوی نرم
          borderRadius: "8px",
          backgroundColor: "white",
          height: "fit-content",
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        horizontal: {
          // direction: "rtl",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: "24px  32px",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          height: "56px",
        },
      },
    },
    MuiAccordion: {
      defaultProps: {
        square: true,
        disableGutters: true,

        sx: {
          "& .Mui-expanded": {
            bgcolor: "#E1DEFA",
          },
          "&::before": {
            display: "none",
          },
        },
      },
    },
    MuiDialogTitle: {
      defaultProps: {
        dir: "rtl",
      },
    },
    MuiDialogContent: {
      defaultProps: {
        dir: "rtl",
      },
    },
  },
});

export default theme;
