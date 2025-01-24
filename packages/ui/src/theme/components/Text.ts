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
  },
  defaultProps: {
    size: 'base',
  },
};

export default CustomText;
