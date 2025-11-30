// color design tokens export
export const tokensDark = {
  grey: {
    0: "#ffffff",
    50: "#f6f6f7",
    100: "#e2e3e5",
    200: "#c8c9cc",
    300: "#a1a2a6",
    400: "#70727a",
    500: "#4d4f57",
    600: "#393b42",
    700: "#2b2c33",
    800: "#1d1e24",
    900: "#121317",
    1000: "#000000",
  },
  primary: {
    // Modern blue palette
    100: "#eff3ff",
    200: "#d9e2ff",
    300: "#b9c7ff",
    400: "#8ea7ff",
    500: "#6a8aff",
    600: "#466aff",
    700: "#2f4dd8",
    800: "#1e35a8",
    900: "#142473",
  },
  secondary: {
    // Vibrant accent palette
    100: "#f5edff",
    200: "#eadbff",
    300: "#d0b9ff",
    400: "#b799ff",
    500: "#9f7aff",
    600: "#8462e6",
    700: "#6448b3",
    800: "#463280",
    900: "#2c1e4d",
  },
  accent: {
    // Additional accent colors for variety
    purple: "#a881ff",
    pink: "#ff6ea8",
    teal: "#2fc6c9",
    emerald: "#3fcf8e",
  },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[500],
              light: tokensDark.primary[400],
              dark: tokensDark.primary[700],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[400],
              light: tokensDark.secondary[300],
              dark: tokensDark.secondary[600],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[900],
              paper: tokensDark.grey[800],
              alt: tokensDark.grey[700],
            },
            text: {
              primary: tokensDark.grey[50],
              secondary: tokensDark.grey[300],
            },
            divider: tokensDark.grey[700],
            accent: tokensDark.accent,
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.primary[600],
              light: tokensDark.primary[200],
              dark: tokensDark.primary[800],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[500],
              light: tokensDark.secondary[300],
              dark: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[700],
            },
            background: {
              default: tokensDark.grey[0],
              paper: tokensDark.grey[0],
              alt: tokensDark.grey[50],
            },
            text: {
              primary: tokensDark.grey[900],
              secondary: tokensDark.grey[600],
            },
            divider: tokensDark.grey[200],
            accent: tokensDark.accent,
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: "3rem",
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: "2.25rem",
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: "-0.01em",
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: "1.875rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: "1.25rem",
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: "1rem",
        fontWeight: 600,
        lineHeight: 1.6,
      },
      subtitle1: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.75,
      },
      subtitle2: {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.57,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.43,
      },
      button: {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.75,
        textTransform: "none",
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: 1.66,
      },
      overline: {
        fontSize: "0.75rem",
        fontWeight: 600,
        lineHeight: 2.66,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      },
    },
    shape: {
      borderRadius: 12,
    },
    shadows: [
      "none",
      "0px 2px 4px rgba(0,0,0,0.05)",
      "0px 4px 6px rgba(0,0,0,0.07)",
      "0px 6px 12px rgba(0,0,0,0.1)",
      "0px 8px 16px rgba(0,0,0,0.12)",
      "0px 12px 24px rgba(0,0,0,0.15)",
      "0px 16px 32px rgba(0,0,0,0.18)",
      "0px 20px 40px rgba(0,0,0,0.2)",
      "0px 24px 48px rgba(0,0,0,0.22)",
      // Continue pattern for remaining shadows
      ...Array(16).fill("0px 24px 48px rgba(0,0,0,0.22)"),
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            textTransform: "none",
            fontWeight: 500,
            padding: "10px 20px",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  };
};
