import {
  Collapse,
  Flex,
  HStack,
  Text,
  useDisclosure,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
// import { ChevronDownIcon } from '~/lib/components/CustomIcons';
import { Option } from '~/lib/interfaces/general.interfaces';

interface DimensionDropDownProps {
  options: Option[];
  value: string;
  // eslint-disable-next-line no-unused-vars
  handleChange: (value: string) => void;
}
const DimensionDropDown = (props: DimensionDropDownProps) => {
  const { options, value, handleChange } = props;
  const { isOpen, onClose } = useDisclosure();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: containerRef,
    handler: () => onClose(),
  });

  return (
    <Flex
      direction="column"
      position="absolute"
      ref={containerRef}
      cursor="pointer"
      width="48px"
      top={0}
      height="50px"
      alignItems="flex-end"
      justifyContent="center"
      right={0}
      zIndex={99}
    >
      <HStack
        // onClick={onToggle}
        height="19px"
        borderLeftWidth="1px"
        paddingRight="16px"
        paddingLeft="14px"
        borderColor="neutral.300"
        spacing="8px"
        width="46px"
        cursor="pointer"
        justifyContent="flex-end"
        // pl="10px"
      >
        <Text size="md" color={value ? 'neutral.800' : 'neutral.300'}>
          {value ? value : 'cm'}
        </Text>
        {/* <Icon as={ChevronDownIcon} boxSize="16px" color="neutral.800" /> */}
      </HStack>
      <Collapse in={isOpen}>
        <VStack
          spacing="8px"
          alignItems="flex-end"
          direction="column"
          bgColor="neutral.100"
          py="4px"
          rounded="4px"
          mt="18px"
          position="absolute"
          zIndex={9999}
          boxShadow="md"
          width="60px"
        >
          {options.map((option) => (
            <Text
              key={option?.value}
              size="md"
              color="black"
              width="full"
              p="4px"
              _hover={{ bgColor: 'neutral.200' }}
              cursor="pointer"
              onClick={() => {
                handleChange(option?.value as string);
                onClose();
              }}
            >
              {option?.label}
            </Text>
          ))}
        </VStack>
      </Collapse>
    </Flex>
  );
};

export default DimensionDropDown;
