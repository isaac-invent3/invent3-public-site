/* eslint-disable no-unused-vars */
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Collapse,
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';

interface DropDownProps {
  label: string;
  options: Option[];
  name: string;
  width: string;
  handleClick?: (option: Option) => void;
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
          <Text
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
          </Text>
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
              <Text
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
                {option.label}
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

export default TimezoneDropdown;
