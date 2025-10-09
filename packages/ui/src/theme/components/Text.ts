import type { ComponentStyleConfig } from '@chakra-ui/react';

const CustomText: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 500,
  },
  sizes: {
    xs: {
      fontSize: '10px',
      lineHeight: '100%',
    },
    base: {
      fontSize: '12px',
      lineHeight: '100%',
    },
    md: {
      fontSize: '14px',
      lineHeight: '100%',
    },
    lg: {
      fontSize: '16px',
      lineHeight: '100%',
    },
    xl: {
      fontSize: '24px',
      lineHeight: '100%',
    },
    '2xl': {
      fontSize: '32px',
      lineHeight: '100%',
    },
  },
  defaultProps: {
    size: 'base',
  },
};

export default CustomText;
