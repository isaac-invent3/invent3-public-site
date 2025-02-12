import type { ComponentStyleConfig } from '@chakra-ui/react';

const CustomHeading: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 700,
  },
  sizes: {
    base: {
      fontSize: '14px',
      lineHeight: '16.63px',
    },
    md: {
      fontSize: '16px',
      lineHeight: '19.01px',
    },
    lg: {
      fontSize: '24px',
      lineHeight: '28.51px',
    },
    xl: {
      fontSize: '32px',
      lineHeight: '38.02px',
    },
    '2xl': {
      fontSize: '40px',
      lineHeight: '47.52px',
    },
  },
  defaultProps: {
    size: 'lg',
  },
};

export default CustomHeading;
