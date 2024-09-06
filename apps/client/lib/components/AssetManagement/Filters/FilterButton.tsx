import {
  HStack,
  ComponentWithAs,
  Icon,
  IconProps,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { ChevronDownIcon } from '../../CustomIcons';

interface FilterButtonProps {
  isActive: boolean;
  icon: ComponentWithAs<'svg', IconProps>;
  label: string;
  handleClick: () => void;
}

const FilterButton = (props: FilterButtonProps) => {
  const { isActive, icon, label, handleClick } = props;

  return (
    <HStack
      as="button"
      minH="36px"
      minW="min-content"
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
    >
      <HStack spacing="8px">
        <Icon
          as={icon}
          boxSize="24px"
          color={isActive ? 'white' : 'neutral.800'}
        />
        <Text width="full" whiteSpace="nowrap">
          {label}
        </Text>
      </HStack>
      <Icon
        as={ChevronDownIcon}
        boxSize="16px"
        color={isActive ? 'white' : 'neutral.800'}
        transition="transform 0.3s ease-out"
        transform={isActive ? 'rotate(-180deg)' : 'rotate(0deg)'}
      />
    </HStack>
  );
};

export default FilterButton;
