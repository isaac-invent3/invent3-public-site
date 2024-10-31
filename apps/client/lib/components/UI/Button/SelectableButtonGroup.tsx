import { HStack } from '@chakra-ui/react';
import { Option } from '~/lib/interfaces/general.interfaces';
import Button from '.';

interface SelectableButtonGroupProps {
  options: Option[];
  selectedOptions: Option[];
  // eslint-disable-next-line no-unused-vars
  handleSelect: (options: Option[]) => void;
  customContainerStyle?: { [name: string]: unknown };
  customButtonStyle?: { [name: string]: unknown };
  buttonVariant: 'solid' | 'outline';
  isMultiSelect: boolean;
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
  } = props;

  const handleClick = (item: Option) => {
    if (isMultiSelect) {
      const isSelected = selectedOptions.some(
        (option) => option.value === item.value
      );
      const newSelectedOptions = isSelected
        ? selectedOptions.filter((option) => option.value !== item.value)
        : [...selectedOptions, item];
      handleSelect(newSelectedOptions);
    } else {
      handleSelect([item]);
    }
  };

  return (
    <HStack spacing="8px" {...customContainerStyle} flex="flex-wrap">
      {options.map((item, index) => (
        <Button
          key={index}
          handleClick={() => handleClick(item)}
          customStyles={{
            py: '10px',
            px: '16px',
            height: 'full',
            color: selectedOptions.some((option) => option.value === item.value)
              ? 'white'
              : 'black',
            width: 'max-content',
            border: selectedOptions.some(
              (option) => option.value === item.value
            )
              ? 'none'
              : buttonVariant === 'outline'
                ? '1px solid #BBBBBB80'
                : 'none',
            bgColor: selectedOptions.some(
              (option) => option.value === item.value
            )
              ? 'primary.500'
              : buttonVariant === 'solid'
                ? '#F7F7F7'
                : 'transparent',
            _hover: { bgColor: 'none' },
            _active: { bgColor: 'none' },
            _focus: { bgColor: 'none' },
            ...customButtonStyle,
          }}
        >
          {item.label}
        </Button>
      ))}
    </HStack>
  );
};

export default SelectableButtonGroup;
