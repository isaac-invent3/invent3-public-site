import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure,
  Box,
  VStack,
  Text,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { AddIcon, ChevronDownIcon } from '~/lib/components/CustomIcons';
import Link from 'next/link';
import TemplateButton from '../Plans/Common/TemplateButton';

interface ActionButtonPopoverProps {
  newRoute: string;
  onOpenTemplateModal: () => void;
  children: React.ReactNode;
  suffix: string;
}

const ActionButtonPopover = (props: ActionButtonPopoverProps) => {
  const { newRoute, onOpenTemplateModal, children, suffix } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="blackAlpha.600"
          zIndex="9"
          onClick={onClose}
        />
      )}

      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom-start"
      >
        <PopoverTrigger>
          <HStack
            width="175px"
            p="16px"
            bgColor="primary.500"
            rounded="8px"
            justifyContent="space-between"
            cursor="pointer"
            spacing={0}
          >
            <HStack alignItems="center" spacing="4px">
              <Icon
                as={AddIcon}
                boxSize="18px"
                color="secondary.pale.500"
                mb="2px"
              />
              <Text color="secondary.pale.500">Add New {suffix}</Text>
            </HStack>
            <Icon
              as={ChevronDownIcon}
              color="secondary.pale.500"
              boxSize="16px"
            />
          </HStack>
        </PopoverTrigger>
        <PopoverContent
          p={0}
          m={0}
          position="relative"
          zIndex="999"
          width="full"
          rounded="8px"
          border="none"
          overflow="hidden"
          outline={0}
          _focus={{
            borderColor: 'transparent',
          }}
          _active={{
            borderColor: 'transparent',
          }}
          _focusVisible={{
            borderColor: 'transparent',
          }}
        >
          <PopoverBody pt="28px" pb="20px" pl="16px" pr="16px">
            <VStack spacing="12px">
              <Link href={newRoute} style={{ width: '100%' }}>
                <Text color="#0E2642" textAlign="center">
                  Create a New {suffix}
                </Text>
              </Link>
              <TemplateButton handleClick={() => onOpenTemplateModal()}>
                Create from Template
              </TemplateButton>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {children}
    </>
  );
};

export default ActionButtonPopover;
