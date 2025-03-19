// themeComponents.js
import { tokens, greenScale, yellowScale, grayScale } from './themeTokens';

const buttonBase = {
  fontWeight: tokens.fontWeights.medium,
  borderRadius: tokens.radii.base,
  padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
  transition: 'all 0.2s ease-in-out',
};

const components = {
  button: {
    baseStyle: { ...buttonBase },
    variants: {
      primary: {
        backgroundColor: greenScale[600],
        color: '#fff',
        border: 'none',
        _hover: {
          backgroundColor: greenScale[700],
          transform: 'translateY(-1px)',
          boxShadow: tokens.shadows.md,
        },
        _active: {
          backgroundColor: greenScale[800],
          transform: 'translateY(0)',
          boxShadow: tokens.shadows.sm,
        },
        _disabled: {
          backgroundColor: grayScale[600],
          cursor: 'not-allowed',
          opacity: 0.6,
          _hover: { transform: 'none', boxShadow: 'none' },
        },
      },
      secondary: {
        backgroundColor: yellowScale[500],
        color: '#000',
        border: 'none',
        _hover: {
          backgroundColor: yellowScale[600],
          transform: 'translateY(-1px)',
          boxShadow: tokens.shadows.md,
        },
        _active: {
          backgroundColor: yellowScale[700],
          transform: 'translateY(0)',
          boxShadow: tokens.shadows.sm,
        },
        _disabled: {
          backgroundColor: grayScale[600],
          color: grayScale[400],
          cursor: 'not-allowed',
          opacity: 0.6,
          _hover: { transform: 'none', boxShadow: 'none' },
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: greenScale[400],
        border: `2px solid ${greenScale[600]}`,
        _hover: {
          backgroundColor: 'rgba(29, 191, 29, 0.1)',
          color: greenScale[300],
          transform: 'translateY(-1px)',
        },
        _active: {
          backgroundColor: 'rgba(29, 191, 29, 0.2)',
          color: greenScale[300],
          transform: 'translateY(0)',
        },
        _disabled: {
          color: grayScale[500],
          borderColor: grayScale[600],
          cursor: 'not-allowed',
          opacity: 0.6,
          _hover: { transform: 'none', backgroundColor: 'transparent' },
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: greenScale[400],
        border: 'none',
        _hover: { backgroundColor: 'rgba(29, 191, 29, 0.1)' },
        _active: { backgroundColor: 'rgba(29, 191, 29, 0.2)' },
        _disabled: {
          color: grayScale[600],
          cursor: 'not-allowed',
          opacity: 0.6,
          _hover: { backgroundColor: 'transparent' },
        },
      },
    },
    sizes: {
      xs: {
        fontSize: tokens.fontSizes.xs,
        padding: `${tokens.spacing[1]} ${tokens.spacing[2]}`,
        height: tokens.spacing[6],
      },
      sm: {
        fontSize: tokens.fontSizes.sm,
        padding: `${tokens.spacing[1.5]} ${tokens.spacing[3]}`,
        height: tokens.spacing[8],
      },
      md: {
        fontSize: tokens.fontSizes.md,
        padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
        height: tokens.spacing[10],
      },
      lg: {
        fontSize: tokens.fontSizes.lg,
        padding: `${tokens.spacing[2.5]} ${tokens.spacing[5]}`,
        height: tokens.spacing[12],
      },
      xl: {
        fontSize: tokens.fontSizes.xl,
        padding: `${tokens.spacing[3]} ${tokens.spacing[6]}`,
        height: tokens.spacing[14],
      },
    },
  },
  input: {
    baseStyle: {
      backgroundColor: '#2d2d2d',
      color: '#fff',
      borderRadius: tokens.radii.base,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#444444',
      transition: 'all 0.2s ease-in-out',
      padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
      lineHeight: tokens.lineHeights.normal,
      fontWeight: tokens.fontWeights.normal,
      outline: 'none',
      _focus: {
        borderColor: greenScale[500],
        boxShadow: `0 0 0 1px ${greenScale[500]}`,
      },
      _hover: { borderColor: '#555555' },
      _disabled: {
        opacity: 0.6,
        cursor: 'not-allowed',
        backgroundColor: '#252525',
      },
      _placeholder: { color: grayScale[500] },
    },
    variants: {
      filled: {
        backgroundColor: '#252525',
        _hover: { backgroundColor: '#2d2d2d' },
        _focus: { backgroundColor: '#2d2d2d' },
      },
      flushed: {
        borderRadius: 0,
        paddingLeft: 0,
        paddingRight: 0,
        borderWidth: 0,
        borderBottomWidth: '1px',
        _focus: {
          borderColor: greenScale[500],
          boxShadow: `0 1px 0 0 ${greenScale[500]}`,
        },
      },
    },
    sizes: {
      sm: {
        fontSize: tokens.fontSizes.sm,
        height: tokens.spacing[8],
        padding: `${tokens.spacing[1]} ${tokens.spacing[2]}`,
      },
      md: {
        fontSize: tokens.fontSizes.md,
        height: tokens.spacing[10],
        padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
      },
      lg: {
        fontSize: tokens.fontSizes.lg,
        height: tokens.spacing[12],
        padding: `${tokens.spacing[2.5]} ${tokens.spacing[4]}`,
      },
    },
  },
  card: {
    baseStyle: {
      backgroundColor: '#2d2d2d',
      borderRadius: tokens.radii.lg,
      overflow: 'hidden',
      boxShadow: tokens.shadows.md,
      transition: 'all 0.2s ease-in-out',
    },
    variants: {
      elevated: { boxShadow: tokens.shadows.lg },
      outline: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#3a3a3a',
        boxShadow: 'none',
      },
      filled: { backgroundColor: '#252525' },
      unstyled: { backgroundColor: 'transparent', boxShadow: 'none', borderRadius: 0 },
      interactive: {
        cursor: 'pointer',
        _hover: { transform: 'translateY(-2px)', boxShadow: tokens.shadows.lg },
        _active: { transform: 'translateY(0)', boxShadow: tokens.shadows.md },
      },
      gradient: { background: `linear-gradient(180deg, #2d2d2d 0%, #262626 100%)` },
    },
  },
  modal: {
    baseStyle: {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: tokens.zIndices.modal,
      },
      dialog: {
        backgroundColor: '#2d2d2d',
        borderRadius: tokens.radii.lg,
        boxShadow: tokens.shadows.xl,
        zIndex: tokens.zIndices.modal,
        overflow: 'hidden',
      },
      header: {
        padding: tokens.spacing[6],
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: '#3a3a3a',
      },
      body: { padding: tokens.spacing[6] },
      footer: {
        padding: tokens.spacing[6],
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderTopColor: '#3a3a3a',
      },
      closeButton: {
        position: 'absolute',
        top: tokens.spacing[2],
        right: tokens.spacing[2],
        padding: tokens.spacing[2],
        color: grayScale[400],
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: tokens.radii.full,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        _hover: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: grayScale[300] },
        _active: { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
      },
    },
    sizes: {
      xs: { width: '20rem' },
      sm: { width: '24rem' },
      md: { width: '32rem' },
      lg: { width: '40rem' },
      xl: { width: '48rem' },
      full: { width: '100%', height: '100%', margin: 0, borderRadius: 0 },
    },
  },
  roles: {
    customer: { primary: greenScale[600], secondary: yellowScale[500], accent: '#ff6b6b' },
    merchant: { primary: '#4a6fa5', secondary: '#6b8cae', accent: '#c3b59f' },
    staff: { primary: '#9c6644', secondary: '#b08968', accent: '#ddbea9' },
    driver: { primary: '#7209b7', secondary: '#9d4edd', accent: '#c77dff' },
    admin: { primary: '#1a535c', secondary: '#4ecdc4', accent: '#f7fff7' },
  },
};

export default components;
