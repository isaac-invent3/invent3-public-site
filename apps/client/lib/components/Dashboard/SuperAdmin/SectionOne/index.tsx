import { HStack, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import SummaryCard from './SummaryCard';
import {
  CardIcon,
  CompanyIcon,
  EditIcon,
} from '~/lib/components/CustomIcons/Dashboard';
import { UserManagementIcon } from '~/lib/components/CustomIcons/layout';
import { useGetSuperAdminDashboardStatQuery } from '~/lib/redux/services/dashboard/superadmin.services';

const SectionOne = () => {
  const { data, isLoading } = useGetSuperAdminDashboardStatQuery();
  return (
    <SimpleGrid width="full" gap="16px" columns={{ base: 1, md: 3, lg: 5 }}>
      <SummaryCard
        title="Total Companies"
        icon={CompanyIcon}
        value={data?.data?.totalCompaniesUnderMgt}
        isLoading={isLoading}
        showRange={false}
      />
      <SummaryCard
        title="New Onboarded Companies"
        icon={CompanyIcon}
        value={data?.data?.newOnboardedCompaniesByMonth}
        isLoading={isLoading}
        percentChange={data?.data?.newOnboardedCompaniesPercentageChange}
      />
      <SummaryCard
        title="Active Subscription"
        icon={CardIcon}
        value={data?.data?.activeSubscriptionsByMonth}
        isLoading={isLoading}
        percentChange={data?.data?.activeSubscriptionsPercentageChange}
      />
      <SummaryCard
        title="Total Users"
        icon={UserManagementIcon}
        value={data?.data?.totalUsers}
        isLoading={isLoading}
      >
        <HStack spacing="4px">
          <Skeleton isLoaded={!isLoading}>
            <Text
              color="#17A1FA"
              py="4px"
              px="12px"
              rounded="full"
              bgColor="#17A1FA1A"
              fontWeight={700}
            >
              {data?.data?.totalInactiveUsersByMonth}
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
        value={data?.data?.pendingFeedbacks}
        isLoading={isLoading}
        percentChange={data?.data?.pendingFeedbacksPercentageChange}
      />
    </SimpleGrid>
  );
};

export default SectionOne;
