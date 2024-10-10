import type { DeepPartial, Theme } from '@chakra-ui/react';

type CustomColorShades = {
  50?: string;
  100?: string;
  200?: string;
  250?: string;
  300?: string;
  400?: string;
  500: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
  accent?: string;
};

type ExtendedColors = {
  primary?: CustomColorShades;
  secondary?: {
    purple: CustomColorShades;
    pale: CustomColorShades;
  };
  tetiary?: CustomColorShades;
  neutral?: {
    [key: number]: string;
  };
  brand?: CustomColorShades;
  error?: CustomColorShades;
};

/** extend additional color here */
const extendedColors: DeepPartial<ExtendedColors> = {
  primary: {
    500: '#0E2642',
    accent: '#6E7D8E',
  },
  secondary: {
    purple: {
      500: '#B279A2',
      accent: '#D1AFC7',
    },
    pale: {
      500: '#D2FEFD',
      accent: '#E4FEFE',
    },
  },
  tetiary: {
    500: '#ECE2D8',
    accent: '#F4EEE8',
  },
  neutral: {
    100: '#F7F7F7',
    200: '#F2F1F1',
    250: '#E6E6E6',
    300: '#BBBBBB',
    600: '#838383',
    700: '#656565',
    800: '#42403D',
  },
  brand: {
    500: '#98FEFE',
  },
  error: {
    200: '#FFDCDC',
    500: '#FD3C3C',
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};
