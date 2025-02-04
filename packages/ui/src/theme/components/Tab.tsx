import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const customVariant = definePartsStyle(() => {
  return {
    tab: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '16.63px',
      whiteSpace: 'nowrap',
      _selected: {
        color: 'primary.500',
        fontWeight: 700,
        borderBottom: '2px',
        borderColor: 'primary.500',
      },
      alignItems: 'center',
      px: '4px',
      py: 0,
      pb: '17px',
      mr: '19px',
    },
    tablist: {
      textAlign: 'left',
      color: 'neutral.600',
      borderBottom: '1px',
      p: 0,
      borderColor: 'neutral.300',
      overflow: 'auto',
    },
    indicator: {
      height: '50px',
    },
    tabpanels: {
      border: '0px',
    },
    tabpanel: {
      p: 0,
      m: 0,
    },
  };
});

const variants = {
  custom: customVariant,
};

export const tabsTheme = defineMultiStyleConfig({ variants });
