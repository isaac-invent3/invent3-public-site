import type { ComponentStyleConfig } from '@chakra-ui/react';

const CustomText: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 500,
  },
  sizes: {
    xs: {
      fontSize: '10px',
      lineHeight: '11.88px',
    },
    base: {
      fontSize: '12px',
      lineHeight: '14.26px',
    },
    md: {
      fontSize: '14px',
      lineHeight: '16.63px',
    },
    lg: {
      fontSize: '16px',
      lineHeight: '19.01px',
    },
    xl: {
      fontSize: '24px',
      lineHeight: '28.51px',
    },
    '2xl': {
      fontSize: '32px',
      lineHeight: '38.02px',
    },
  },
  defaultProps: {
    size: 'base',
  },
};

export default CustomText;
