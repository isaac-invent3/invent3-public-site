import {
  Box,
  Collapse,
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { ChevronDownIcon, HamburgerIcon } from '~/lib/components/CustomIcons';

interface ComponentBoxProps {
  isPrimary: boolean;
  hasParent: boolean;
  children: React.ReactNode;
  assetName: string;
  nodeType: 'Parent' | 'Asset' | 'Child';
}

const ComponentBox = (props: ComponentBoxProps) => {
  const { isPrimary, hasParent, assetName, nodeType, children } = props;
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Flex width="full" direction="column" position="relative">
      {hasParent && (
        <Box
          width="calc(100% - 21px)"
          height="36px"
          borderLeft="2px"
          borderBottom="2px"
          borderColor="neutral.300"
          position="absolute"
          ml="21px"
        />
      )}
      <Flex
        width="full"
        position="relative"
        mt={hasParent ? '16px' : 0}
        pl={hasParent ? '56px' : 0}
      >
        <Flex
          width="full"
          boxShadow="0px 4px 4px 0px #74747426"
          border="1px solid #D0D0D0"
          rounded="4px"
          overflow="hidden"
          direction="column"
        >
          <HStack
            width="full"
            height="40px"
            cursor="pointer"
            onClick={onToggle}
            spacing={0}
          >
            <HStack
              width="40px"
              bgColor={isPrimary ? 'primary.accent' : 'neutral.200'}
              height="full"
              justifyContent="center"
            >
              <Icon
                as={HamburgerIcon}
                boxSize="20px"
                color={isPrimary ? 'neutral.100' : 'neutral.600'}
              />
            </HStack>
            <HStack
              width="full"
              justifyContent="space-between"
              px="8px"
              py="4px"
              bgColor={isPrimary ? 'primary.500' : 'white'}
            >
              <VStack alignItems="flex-start" spacing="4px">
                <Text color={isPrimary ? 'white' : 'black'} fontWeight={700}>
                  {assetName}
                </Text>
                <Text fontWeight={700} color="neutral.600">
                  {nodeType} Node
                </Text>
              </VStack>
              <Icon
                as={ChevronDownIcon}
                boxSize="20px"
                color={isPrimary ? 'neutral.200' : '#374957'}
                transition="transform 0.3s ease-out"
                transform={isOpen ? 'rotate(-180deg)' : 'rotate(0deg)'}
              />
            </HStack>
          </HStack>
          <Collapse in={isOpen} animateOpacity>
            {children}
          </Collapse>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ComponentBox;
