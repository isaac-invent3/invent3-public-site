import {
  Collapse,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { CheckBox } from '@repo/ui/components';
import React from 'react';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';
import { Permission } from './Permission';

const Module = () => {
  const { onToggle, isOpen } = useDisclosure();
  return (
    <VStack width="full">
      <HStack
        width="full"
        justifyContent="space-between"
        as="button"
        onClick={onToggle}
        bgColor={isOpen ? 'neutral.200' : 'white'}
        py="20px"
        px="32px"
      >
        <HStack spacing="16px" width="60%">
          <CheckBox isChecked={false} handleChange={() => {}} />
          <Text color="black" fontWeight={700}>
            Modules
          </Text>
        </HStack>
        <HStack width="40%" ml="24px" position="relative">
          <SimpleGrid width="full" columns={4}>
            {Array(4)
              .fill('')
              .map((_, index) => (
                <CheckBox
                  isChecked={false}
                  handleChange={() => {}}
                  key={index}
                  customStyle={{ width: 'max-content' }}
                />
              ))}
          </SimpleGrid>
          <Icon
            as={ChevronDownIcon}
            boxSize="16px"
            color="#374957"
            position="absolute"
            right={0}
            transition="transform 0.3s ease-out"
            transform={isOpen ? 'rotate(-180deg)' : 'rotate(0deg)'}
          />
        </HStack>
      </HStack>
      <Collapse in={isOpen}>
        <HStack
          width="full"
          spacing="74px"
          flexWrap="wrap"
          rowGap="20px"
          py="24px"
          px="32px"
        >
          {Array(5)
            .fill('')
            .map((_, index) => (
              <Permission
                title="Transfer Assets"
                description="Make your account extra secure. Along with your password, you'll need to enter a code"
                keyName="asset:create"
                isChecked
                key={index}
              />
            ))}
        </HStack>
      </Collapse>
    </VStack>
  );
};

export default Module;
