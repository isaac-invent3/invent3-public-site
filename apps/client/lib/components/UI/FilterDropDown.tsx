/* eslint-disable no-unused-vars */
import {
  HStack,
  Icon,
  Text,
  VStack,
  Flex,
  useDisclosure,
  Collapse,
  useOutsideClick,
} from '@chakra-ui/react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { ChevronDownIcon } from '../CustomIcons';
import CheckBox from './CheckBox';
import { useEffect, useRef, useState } from 'react';

interface FilterDropDownProps {
  label: string;
  options: Option[];
  selectedOptions: (string | number)[];
  handleClick: (value: string | number) => void;
}

const FilterDropDown = (props: FilterDropDownProps) => {
  const { label, options, selectedOptions, handleClick } = props;
  const { onToggle, isOpen, onClose } = useDisclosure();
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref: containerRef,
    handler: () => onClose(),
  });

  return (
    <Flex direction="column" width="full" maxW="max-content" ref={containerRef}>
      <HStack
        onClick={onToggle}
        cursor="pointer"
        bgColor="white"
        width="full"
        minH="36px"
        py="10px"
        px="12px"
        rounded="6px"
        ref={buttonRef}
      >
        <HStack spacing="8px">
          <Text width="full" whiteSpace="nowrap" color="neutral.600">
            {label}
          </Text>
          <HStack spacing="4px" fontWeight={700}>
            <Text py="1px" px="4px" rounded="3px" border="1px solid #BBBBBB">
              {options.length === selectedOptions.length
                ? 'All'
                : selectedOptions.length}
            </Text>
            <Text>Selected</Text>
          </HStack>
        </HStack>
        <Icon as={ChevronDownIcon} boxSize="12px" color="neutral.600" />
      </HStack>

      <Collapse in={isOpen}>
        <VStack
          spacing="8px"
          alignItems="flex-start"
          direction="column"
          bgColor="white"
          py="8px"
          px="12px"
          rounded="6px"
          mt="2px"
          position="absolute"
          zIndex={999}
          boxShadow="md"
          width={buttonRef?.current?.offsetWidth}
        >
          {options.map((option, index) => (
            <HStack key={index} spacing="8px">
              <CheckBox
                isChecked={selectedOptions.includes(option.value)}
                handleChange={() => handleClick(option.value)}
              />
              <Text color="neutral.800">{option.label}</Text>
            </HStack>
          ))}
        </VStack>
      </Collapse>
    </Flex>
  );
};

export default FilterDropDown;
