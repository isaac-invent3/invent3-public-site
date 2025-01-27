import { HStack, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import SummaryCard from './SummaryCard';
import {
  CardIcon,
  CompanyIcon,
  EditIcon,
} from '~/lib/components/CustomIcons/Dashboard';
import { UserManagementIcon } from '~/lib/components/CustomIcons/layout';

const SectionOne = () => {
  return (
    <SimpleGrid width="full" gap="16px" columns={5}>
      <SummaryCard
        title="Total Companies"
        icon={CompanyIcon}
        value={2000}
        isLoading={false}
        showRange={false}
      />
      <SummaryCard
        title="New Onboarded Companies"
        icon={CompanyIcon}
        value={500}
        isLoading={false}
        percentChange={20}
      />
      <SummaryCard
        title="Active Subscription"
        icon={CardIcon}
        value={550}
        isLoading={false}
        percentChange={20}
      />
      <SummaryCard
        title="Total Users"
        icon={UserManagementIcon}
        value={550}
        isLoading={false}
      >
        <HStack spacing="4px">
          <Skeleton isLoaded={true}>
            <Text
              color="#17A1FA"
              py="4px"
              px="12px"
              rounded="full"
              bgColor="#17A1FA1A"
              fontWeight={700}
            >
              {500}
            </Text>
          </Skeleton>
          <Text color="neutral.600" fontWeight={700}>
            Users{' '}
            <Text as="span" color="black" fontWeight={800}>
              NOT
            </Text>{' '}
            Active Last Month
          </Text>
        </HStack>
      </SummaryCard>
      <SummaryCard
        title="Pending Feedbacks"
        icon={EditIcon}
        value={100}
        isLoading={false}
        percentChange={-10}
      />
    </SimpleGrid>
  );
};

export default SectionOne;
