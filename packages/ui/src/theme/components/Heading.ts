import type { ComponentStyleConfig } from '@chakra-ui/react';

const CustomHeading: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 800,
  },
  sizes: {
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
  },
  defaultProps: {
    size: 'xl',
  },
};

export default CustomHeading;
