import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import { components } from './components';
import { appConfig } from './config';
import { fonts } from './fonts';

const customTheme = extendTheme({
  fonts,
  colors,
  config: appConfig,
  components,
});

export default customTheme;
