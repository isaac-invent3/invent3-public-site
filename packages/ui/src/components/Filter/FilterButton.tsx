import {
  ComponentWithAs,
  HStack,
  Icon,
  IconProps,
  StackProps,
  Text as ChakraText,
} from '@chakra-ui/react';

import { ChevronDownIcon } from '../../components/CustomIcons';

interface FilterButtonProps extends StackProps {
  isActive: boolean;
  icon: ComponentWithAs<'svg', IconProps>;
  label: string;
  handleClick: () => void;
  chevron?: boolean;
}

const FilterButton = (props: FilterButtonProps) => {
  const { isActive, icon, label, handleClick, chevron = true, ...rest } = props;

  return (
    <HStack
      as="button"
      height="36px"
      width="max-content"
      py="6px"
      pl="12px"
      pr="10px"
      rounded="8px"
      color={isActive ? 'white' : 'neutral.800'}
      bgColor={isActive ? 'primary.accent' : 'white'}
      onClick={handleClick}
      justifyContent="flex-start"
      spacing="8px"
      transition="background-color 0.3s ease-out"
      {...rest}
    >
      <HStack spacing="8px">
        <Icon
          as={icon}
          boxSize="24px"
          color={isActive ? 'white' : 'neutral.800'}
        />
        <ChakraText width="full" whiteSpace="nowrap">
          {label}
        </ChakraText>
      </HStack>
      {chevron && (
        <Icon
          as={ChevronDownIcon}
          boxSize="16px"
          color={isActive ? 'white' : 'neutral.800'}
          transition="transform 0.3s ease-out"
          transform={isActive ? 'rotate(-180deg)' : 'rotate(0deg)'}
        />
      )}
    </HStack>
  );
};

export default FilterButton;
