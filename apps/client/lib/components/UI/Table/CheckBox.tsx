import React from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';

interface CheckBoxProps {
  isChecked: boolean;
  handleChange: () => void;
}

const CheckBox = (props: CheckBoxProps) => {
  const { isChecked, handleChange } = props;

  return (
    <ChakraCheckbox
      borderColor="neutral.800"
      iconColor="white"
      outline="none"
      sx={{
        '& .chakra-checkbox__control': {
          borderRadius: '4px',
          borderWidth: '1px',
          width: '16px',
          height: '16px',
          outline: 'none',
          bg: 'transparent',
          _hover: {
            bg: 'transparent',
          },
          _checked: {
            bg: 'primary.500',
            border: 'none',
            _hover: {
              bg: 'primary.500',
            },
          },
        },
        '& .chakra-__control': {
          outline: 'none',
        },
      }}
      isChecked={isChecked}
      onChange={handleChange}
    />
  );
};

export default CheckBox;
