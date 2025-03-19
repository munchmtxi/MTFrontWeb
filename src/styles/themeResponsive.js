import { tokens, greenScale, grayScale } from './themeTokens'; // Add grayScale, greenScale
import components from './themeComponents';

// Base theme aggregates tokens and component configurations
const baseTheme = {
  typography: {
    fonts: {
      heading:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      body:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      mono:
        '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
    },
    fontSizes: tokens.fontSizes,
    fontWeights: tokens.fontWeights,
    lineHeights: tokens.lineHeights,
    letterSpacing: tokens.letterSpacing,
  },
  spacing: tokens.spacing,
  radii: tokens.radii,
  shadows: tokens.shadows,
  zIndices: tokens.zIndices,
  animation: tokens.animation,
  breakpoints: tokens.breakpoints,
  grid: tokens.grid,
  transitions: tokens.transitions,
  components,
  greenScale, // Add color scales
  grayScale,
  // Add redScale here if you define it in themeTokens.js later
};

// Returns theme adjustments based on device type
export const getResponsiveTheme = (deviceType) => {
  let responsiveAdjustments = {};

  switch (deviceType) {
    case 'phone':
      responsiveAdjustments = {
        breakpoints: {
          sm: '20em',
          md: '30em',
          lg: '40em',
          xl: '50em',
          '2xl': '60em',
        },
        grid: {
          container: {
            sm: '320px',
            md: '480px',
            lg: '640px',
            xl: '800px',
            '2xl': '960px',
          },
        },
        components: {
          button: {
            sizes: {
              xs: {
                fontSize: tokens.fontSizes.xs,
                padding: `${tokens.spacing[1]} ${tokens.spacing[1.5]}`,
                height: tokens.spacing[5],
              },
              sm: {
                fontSize: tokens.fontSizes.sm,
                padding: `${tokens.spacing[1.5]} ${tokens.spacing[2]}`,
                height: tokens.spacing[7],
              },
            },
          },
        },
      };
      break;
    case 'tablet':
      responsiveAdjustments = {
        breakpoints: {
          sm: '25em',
          md: '37.5em',
          lg: '50em',
          xl: '62.5em',
          '2xl': '75em',
        },
        grid: {
          container: {
            sm: '400px',
            md: '600px',
            lg: '800px',
            xl: '1000px',
            '2xl': '1200px',
          },
        },
      };
      break;
    case 'laptop':
    default:
      responsiveAdjustments = {
        breakpoints: tokens.breakpoints,
        grid: tokens.grid,
      };
      break;
  }

  return { ...baseTheme, ...responsiveAdjustments };
};

export { baseTheme };