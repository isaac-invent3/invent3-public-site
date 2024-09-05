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
    },
    indicator: {
      height: '50px',
    },
    tabpanels: {
      borderTop: '1px',
      p: 0,
      borderColor: 'neutral.300',
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
