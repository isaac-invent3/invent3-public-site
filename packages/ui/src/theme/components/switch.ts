import type { ComponentStyleConfig } from '@chakra-ui/react';

const CustomSwitch: ComponentStyleConfig = {
  baseStyle: {
    track: {
      _checked: {
        bg: '#17A1FA',
      },
      _checkedHover: {
        bg: 'customGreen.600',
      },
    },
  },
};

export default CustomSwitch;
