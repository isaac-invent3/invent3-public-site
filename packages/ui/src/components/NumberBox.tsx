import { Icon, Input, InputProps, VStack } from '@chakra-ui/react';

import { ChevronDownIcon, ChevronUpIcon } from './CustomIcons';

const formatValue = (value: number) => {
  return value < 10 ? `0${value}` : `${value}`;
};

interface NumberBoxProps {
  handleIncrement: () => void;
  handleDecrement: () => void;
  // eslint-disable-next-line no-unused-vars
  handleValueChange: (value: number) => void;
  handleBlur?: () => void;
  value: number;
  maxNumber?: number;
  minNumber?: number;
  customStyle?: InputProps;
}

const NumberBox = (props: NumberBoxProps) => {
  const {
    handleIncrement,
    handleDecrement,
    handleValueChange,
    handleBlur,
    value,
    minNumber = 0,
    maxNumber,
    customStyle,
  } = props;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value.replace(/^0+/, ''), 10); // Remove leading zeroes
    if (!isNaN(newValue)) {
      if (
        newValue >= minNumber &&
        (maxNumber === undefined || newValue <= maxNumber)
      ) {
        handleValueChange(newValue);
      }
    } else {
      handleValueChange(minNumber);
    }
  };

  return (
    <VStack spacing="8px">
      <Icon
        as={ChevronUpIcon}
        boxSize="16px"
        color="neutral.800"
        cursor="pointer"
        onClick={handleIncrement}
      />
      <Input
        p="0px"
        rounded="8px"
        color="black"
        bgColor="#F7F7F7"
        width="50px"
        height="50px"
        fontSize="14px"
        lineHeight="16.63px"
        textAlign="center"
        type="text"
        onChange={handleInputChange}
        value={formatValue(value)}
        onBlur={handleBlur}
        _focusVisible={{ borderColor: 'primary.500' }}
        {...customStyle}
      />

      <Icon
        as={ChevronDownIcon}
        boxSize="16px"
        color="neutral.800"
        cursor="pointer"
        onClick={handleDecrement}
      />
    </VStack>
  );
};

export default NumberBox;
