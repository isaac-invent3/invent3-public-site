import type { ComponentStyleConfig } from '@chakra-ui/react';

const CustomHeading: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 700,
  },
  sizes: {
    base: {
      fontSize: '14px',
      lineHeight: '100%',
    },
    md: {
      fontSize: '16px',
      lineHeight: '100%',
    },
    lg: {
      fontSize: '24px',
      lineHeight: '100%',
    },
    xl: {
      fontSize: '32px',
      lineHeight: '100%',
    },
    '2xl': {
      fontSize: '40px',
      lineHeight: '100%',
    },
  },
  defaultProps: {
    size: 'lg',
  },
};

export default CustomHeading;
