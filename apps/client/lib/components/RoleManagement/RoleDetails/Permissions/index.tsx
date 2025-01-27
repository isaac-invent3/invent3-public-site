import { HStack, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Header from './Header';
import { CheckBox } from '@repo/ui/components';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';

const Permissions = () => {
  return (
    <VStack width="full" spacing={0}>
      <Header />
      <VStack
        width="full"
        justifyContent="space-between"
        py="16px"
        px="32px"
        bgColor="white"
        spacing="16px"
      >
        <HStack width="full" justifyContent="space-between">
          <HStack spacing="8px" width="60%">
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
            />
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Permissions;
