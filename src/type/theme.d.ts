import type { Theme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    gold: Palette["primary"];
  }

  interface PaletteOptions {
    gold?: PaletteOptions["primary"];
  }

  interface CustomTheme extends Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface CustomThemeOptions extends ThemeOptions {
    status?: {
      danger?: string;
    };
  }

  interface TypographyVariants {
    customBold: React.CSSProperties;
    custom: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    customBold?: React.CSSProperties;
    custom?: React.CSSProperties;
  }

  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    gold: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    customBold: true;
    custom: true;
  }
}

