import type { ComponentStyleConfig } from '@chakra-ui/react';

const CustomAlert: ComponentStyleConfig = {
  baseStyle: {
    container: {
      borderRadius: 'md',
      fontSize: 'sm',
    },
  },
  variants: {
    solid: (props) => {
      const { colorScheme } = props;
      if (colorScheme === 'red') {
        return {
          container: {
            bg: '#F50000',
            color: 'white',
            border: '1px solid',
            borderColor: '#F50000',
            boxShadow: 'xl',
          },
        };
      }

      if (colorScheme === 'green') {
        return {
          container: {
            bg: 'green.600',
            color: 'white',
            boxShadow: 'lg',
          },
        };
      }

      return {
        container: {
          bg: `${colorScheme}.600`,
          color: 'white',
          boxShadow: 'lg',
        },
      };
    },
    subtle: (props) => {
      const { colorScheme } = props;
      return {
        container: {
          bg: `${colorScheme}.100`,
          color: `${colorScheme}.800`,
        },
      };
    },
    leftAccent: (props) => {
      const { colorScheme } = props;
      return {
        container: {
          bg: `${colorScheme}.50`,
          color: `${colorScheme}.800`,
          borderLeft: `4px solid`,
          borderColor: `${colorScheme}.500`,
        },
      };
    },
  },
  defaultProps: {
    variant: 'solid',
    colorScheme: 'blue', // Default color scheme
  },
};

export default CustomAlert;
