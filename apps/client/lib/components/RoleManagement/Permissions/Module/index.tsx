import {
  Collapse,
  HStack,
  Icon,
  Skeleton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { CheckBox } from '@repo/ui/components';
import React from 'react';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';
import { Permission } from './Permission';
import { Module } from '~/lib/interfaces/module.interfaces';
import { useGetAllSubModulesQuery } from '~/lib/redux/services/modules.services';

const ModuleItem = ({ data }: { data: Module }) => {
  const { moduleContextTypeName, description } = data;
  const { onToggle, isOpen } = useDisclosure();
  const { data: submodules, isLoading } = useGetAllSubModulesQuery(
    { pageSize: 50 },
    { skip: !isOpen }
  );
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
            {moduleContextTypeName}
          </Text>
        </HStack>
        <HStack width="40%" position="relative" justifyContent="flex-start">
          <Text maxW="90%" textAlign="left">
            {description}
          </Text>
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
          {isLoading
            ? Array(4)
                .fill('')
                .map((_, index) => (
                  <Skeleton width="250px" height="120px" key={index} />
                ))
            : submodules?.data?.items.map((data, index) => (
                <Permission data={data} key={index} />
              ))}
        </HStack>
      </Collapse>
    </VStack>
  );
};

export default ModuleItem;
