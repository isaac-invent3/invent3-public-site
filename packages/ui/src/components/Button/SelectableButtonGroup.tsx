import { ButtonProps, HStack, Skeleton, StackProps } from '@chakra-ui/react';

import Button from '.';
// eslint-disable-next-line no-redeclare
import { Option } from '@repo/interfaces';

interface SelectableButtonGroupProps {
  options: Option[];
  selectedOptions: Option[];
  // eslint-disable-next-line no-unused-vars, no-unused-vars
  handleSelect: (options: Option[]) => void;
  customContainerStyle?: StackProps;
  customButtonStyle?: ButtonProps;
  buttonVariant: 'secondary' | 'outline';
  isMultiSelect: boolean;
  hasAtLeastOneSelected?: boolean;
  isLoading?: boolean;
  colorOptions?: { id: number; colorCode: string }[];
}

const SelectableButtonGroup = (props: SelectableButtonGroupProps) => {
  const {
    options,
    selectedOptions,
    handleSelect,
    customContainerStyle,
    customButtonStyle,
    buttonVariant,
    isMultiSelect,
    hasAtLeastOneSelected = false,
    isLoading,
    colorOptions,
  } = props;

  const handleClick = (item: Option) => {
    let finalValue: Option[];
    if (isMultiSelect) {
      const isSelected = selectedOptions.some(
        (option) => option?.value === item.value
      );
      const newSelectedOptions = isSelected
        ? selectedOptions.filter((option) => option?.value !== item.value)
        : [...selectedOptions, item];
      finalValue = newSelectedOptions;
    } else {
      finalValue = [item];
    }
    if (hasAtLeastOneSelected) {
      if (finalValue.length > 0) {
        handleSelect(finalValue);
      }
    } else {
      handleSelect(finalValue);
    }
  };

  if (isLoading) {
    return (
      <HStack spacing="8px">
        {Array(3)
          .fill('')
          .map((_, index) => (
            <Skeleton width="62px" height="36px" rounded="8px" key={index} />
          ))}
      </HStack>
    );
  }

  return (
    <HStack spacing="8px" flexWrap="wrap" {...customContainerStyle}>
      {options.map((item, index) => {
        const isSelected = selectedOptions.some(
          (option) => option?.value === item.value
        );
        return (
          <Button
            key={index}
            handleClick={() => handleClick(item)}
            variant={isSelected ? 'primary' : buttonVariant}
            customStyles={{
              py: '10px',
              borderColor: isSelected ? 'none' : '#BBBBBB80',
              color: colorOptions
                ? isSelected
                  ? 'white'
                  : colorOptions[item.value as number]?.colorCode
                : isSelected
                  ? 'white'
                  : 'black',
              bgColor: colorOptions
                ? isSelected
                  ? `${colorOptions[item.value as number]?.colorCode}`
                  : `${colorOptions[item.value as number]?.colorCode}14`
                : isSelected
                  ? 'primary.500'
                  : '#F6F6F6',
              _hover: {
                bgColor: colorOptions
                  ? isSelected
                    ? `${colorOptions[item.value as number]?.colorCode}`
                    : `${colorOptions[item.value as number]?.colorCode}14`
                  : isSelected
                    ? 'primary.500'
                    : '#E8E8E8',
              },
              ...customButtonStyle,
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </HStack>
  );
};

export default SelectableButtonGroup;
