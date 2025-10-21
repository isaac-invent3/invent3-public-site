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
  StackProps,
  FlexProps,
  IconProps,
  TextProps,
} from '@chakra-ui/react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useRef } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface DropDownProps {
  label: string;
  options: Option[];
  selectedOptions: Option | null;
  handleClick: (option: Option) => void;
  width?: string;
  isLoading?: boolean;
  labelStyles?: StackProps;
  containerStyles?: FlexProps;
  chevronStyles?: IconProps;
  selectedOptionStyles?: TextProps;
}

const DropDown = (props: DropDownProps) => {
  const {
    label,
    options,
    selectedOptions,
    handleClick,
    width,
    isLoading,
    labelStyles,
    containerStyles,
    chevronStyles,
    selectedOptionStyles,
  } = props;
  const { onToggle, isOpen, onClose } = useDisclosure();
  const containerRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref: containerRef,
    handler: () => onClose(),
  });

  return (
    <Flex
      direction="column"
      width="full"
      maxW="max-content"
      ref={containerRef}
      {...containerStyles}
    >
      <HStack
        onClick={onToggle}
        cursor="pointer"
        bgColor="neutral.200"
        width={width}
        height="28px"
        py="7px"
        px="8px"
        rounded="5px"
        alignItems="center"
        justifyContent="space-between"
        {...labelStyles}
      >
        <Text
          color={selectedOptions ? 'neutral.800' : 'neutral.300'}
          noOfLines={1}
          textOverflow="ellipsis"
          {...selectedOptionStyles}
        >
          {selectedOptions ? selectedOptions.label : label}
        </Text>
        <Icon
          as={ChevronDownIcon}
          boxSize="16px"
          color="neutral.800"
          {...chevronStyles}
        />
      </HStack>

      <Collapse in={isOpen}>
        <VStack
          spacing="8px"
          alignItems="flex-start"
          direction="column"
          bgColor="neutral.200"
          py="8px"
          rounded="5px"
          mt="2px"
          position="absolute"
          zIndex={99}
          boxShadow="md"
          width={width}
          height="min-content"
          maxH="200px"
          overflow="auto"
        >
          {options.length >= 1 ? (
            options.map((option, index) => (
              <Text
                key={index}
                color="neutral.800"
                py="4px"
                px="12px"
                onClick={() => {
                  handleClick(option);
                  onClose();
                }}
                cursor="pointer"
                _hover={{ bgColor: 'neutral.300' }}
                width="full"
              >
                {option?.label}
              </Text>
            ))
          ) : (
            <VStack minH="50px" justifyContent="center" width="full">
              <Text width="full" textAlign="center" color="neutral.300">
                {isLoading ? 'Loading...' : 'No Options'}
              </Text>
            </VStack>
          )}
        </VStack>
      </Collapse>
    </Flex>
  );
};

export default DropDown;
