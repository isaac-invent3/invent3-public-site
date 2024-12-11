/* eslint-disable no-unused-vars */
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Collapse,
  Flex,
  FlexProps,
  HStack,
  Icon,
  Text,
  useDisclosure,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';

type OperatorDropdownProps = {
  handleClick?: (option: Option) => void;
} & FlexProps;

const OperatorDropdown = (props: OperatorDropdownProps) => {
  const { handleClick, ...rest } = props;
  const { onToggle, isOpen, onClose } = useDisclosure();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: containerRef,
    handler: () => onClose(),
  });

  const options: Option[] = [
    { label: 'And', value: 'and' },
    { label: 'Or', value: 'or' },
  ];

  return (
    <Flex
      direction="column"
      width="full"
      maxW="max-content"
      ref={containerRef}
      {...rest}
    >
      <HStack
        onClick={onToggle}
        cursor="pointer"
        width="100%"
        height="20px"
        padding="4px 6px"
        border="1px solid #D4D4D4"
        rounded="4px"
        spacing="8px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center" gap={2}>
          <Text color="black" fontSize="10px">
            Operator
          </Text>
        </Flex>

        <Icon as={ChevronDownIcon} boxSize="12px" color="#42403D" />
      </HStack>

      <Collapse in={isOpen} style={{ zIndex: 99 , background:"white"}}>
        <VStack
          spacing="8px"
          alignItems="flex-start"
          direction="column"
          bgColor="white"
          py="8px"
          rounded="6px"
          mt="5px"
          width="80px"
          position="absolute"
          boxShadow="md"
          height="min-content"
          maxH="200px"
          overflow="auto"
        >
          {options.map((option, index) => (
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
          ))}
        </VStack>
      </Collapse>
    </Flex>
  );
};

export default OperatorDropdown;
