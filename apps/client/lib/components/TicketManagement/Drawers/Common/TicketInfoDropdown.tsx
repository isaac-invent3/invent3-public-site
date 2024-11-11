/* eslint-disable no-unused-vars */
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
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
  selectedOptions: Option | null;
  handleClick: (option: Option) => void;
  width: string;
  isLoading?: boolean;
  colorCode?: string;
  showColorDot?: boolean;
  hasBorder?: boolean;
}

const TicketInfoDropDown = (props: DropDownProps) => {
  const {
    label,
    options,
    selectedOptions,
    handleClick,
    width,
    isLoading,
    colorCode,
    showColorDot = true,
    hasBorder = true,
  } = props;
  const { onToggle, isOpen, onClose } = useDisclosure();
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
        width={width}
        height="28px"
        padding="6px"
        {...(hasBorder
          ? {
              borderWidth: '1px',
              borderColor: `${colorCode}80`,
              bgColor: `${colorCode}0D`,
            }
          : {
              bgColor: `${colorCode}`,
            })}
        rounded="6px"
        spacing="8px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center" gap={2}>
          {showColorDot && (
            <Box width="8px" height="8px" rounded="full" bgColor={colorCode} />
          )}
          <Text color="black" textTransform="capitalize">
            {selectedOptions ? selectedOptions.label : label}
          </Text>
        </Flex>

        <Icon as={ChevronDownIcon} boxSize="20px" color={`${colorCode}80`} />
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
                  handleClick(option);
                  onClose();
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

export default TicketInfoDropDown;
