/* eslint-disable no-unused-vars */
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Collapse,
  Flex,
  HStack,
  Icon,
  Text as ChakraText,
  useDisclosure,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { Option as IOption } from '@repo/interfaces';

interface DropDownProps {
  label: string;
  options: IOption[];
  name: string;
  width: string;
  handleClick?: (option: IOption) => void;
  isLoading?: boolean;
}

const TimezoneDropdown = (props: DropDownProps) => {
  const { label, options, name, handleClick, width, isLoading } = props;
  const { onToggle, isOpen, onClose } = useDisclosure();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: containerRef,
    handler: () => onClose(),
  });

  const getLabel = () => {
    if (isLoading) return 'Loading ...';

    return label;
  };

  return (
    <Flex direction="column" width="full" maxW="max-content" ref={containerRef}>
      <HStack
        onClick={onToggle}
        cursor="pointer"
        width={width}
        height="28px"
        padding="6px"
        rounded="6px"
        spacing="8px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center" gap={2}>
          {/* Work on the Ellipsis for this */}
          <ChakraText
            color="#0E2642"
            // textOverflow="ellipsis"
            // noOfLines={1}
            // textTransform="capitalize"
            // overflow="hidden"
            flex="1"
            fontWeight={500}
            fontSize="14px"
          >
            {getLabel()}
          </ChakraText>
        </Flex>

        <Icon as={ChevronDownIcon} boxSize="20px" color={`#42403D`} />
      </HStack>

      <Collapse in={isOpen} style={{ zIndex: 99 }}>
        <VStack
          spacing="8px"
          alignItems="flex-start"
          direction="column"
          bgColor="white"
          py="8px"
          rounded="6px"
          mt="5px"
          position="absolute"
          boxShadow="md"
          width={width}
          height="min-content"
          maxH="200px"
          overflow="auto"
        >
          {options.length >= 1 ? (
            options.map((option, index) => (
              <ChakraText
                key={index}
                color="neutral.800"
                py="4px"
                px="12px"
                onClick={() => {
                  onClose();
                  handleClick && handleClick(option);
                }}
                cursor="pointer"
                _hover={{ bgColor: 'neutral.300' }}
                width="full"
              >
                {option?.label}
              </ChakraText>
            ))
          ) : (
            <VStack minH="50px" justifyContent="center" width="full">
              <ChakraText width="full" textAlign="center" color="neutral.300">
                {isLoading ? 'Loading...' : 'No Options'}
              </ChakraText>
            </VStack>
          )}
        </VStack>
      </Collapse>
    </Flex>
  );
};

export default TimezoneDropdown;
