/* eslint-disable no-unused-vars */
import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { assetData } from '~/lib/utils/MockData/asset';
import Table from './Table';

const EmptyState = ({ text }: { text: string }) => {
  return (
    <Text
      width="full"
      fontSize="14px"
      lineHeight="16.63px"
      fontWeight={400}
      fontStyle="italic"
      my="41px"
      color="neutral.600"
      textAlign="center"
    >
      {text}
    </Text>
  );
};

const RelationshipTab = () => {
  return (
    <VStack width="full" spacing="24px" alignItems="flex-start" my="24px">
      <VStack width="full" spacing="16px" alignItems="flex-start">
        <Text
          fontSize="14px"
          lineHeight="16.63px"
          fontWeight={700}
          color="primary.500"
        >
          Parent
        </Text>
        <EmptyState text="The Asset has no parent asset" />
      </VStack>

      <VStack width="full" spacing="16px" alignItems="flex-start">
        <Text
          fontSize="14px"
          lineHeight="16.63px"
          fontWeight={700}
          color="primary.500"
        >
          Children (Components)
        </Text>
        <Table
          type="children"
          data={assetData.slice(0, 3) ?? []}
          isLoading={false}
        />
      </VStack>
    </VStack>
  );
};

export default RelationshipTab;
