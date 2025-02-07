import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import {
  ApprovalIcon,
  MaintenanceIcon,
  TicketSlantedIcon,
} from '~/lib/components/CustomIcons/Dashboard';
import { useGetSuperAdminDashboardStatQuery } from '~/lib/redux/services/dashboard/superadmin.services';
import SummaryCard from './SummaryCardWithPercentChange';
import { AssetManagementIcon } from '~/lib/components/CustomIcons/layout';
import { formatNumberShort } from '~/lib/utils/helperFunctions';

const SectionOne = () => {
  const { data, isLoading } = useGetSuperAdminDashboardStatQuery();
  return (
    <SimpleGrid width="full" gap="16px" columns={{ base: 1, md: 3, lg: 5 }}>
      <SummaryCard
        title="Total Asset Managed Under Management"
        icon={AssetManagementIcon}
        value={data?.data?.totalCompaniesUnderMgt}
        isLoading={isLoading}
        showRange={false}
        percentChange={data?.data?.newOnboardedCompaniesPercentageChange}
        progressText="Growth Year on Year"
      />
      <SummaryCard
        title="Total Asset Value"
        icon={AssetManagementIcon}
        value={`$${formatNumberShort(10004000)}`}
        isLoading={isLoading}
        showRange={false}
        percentChange={data?.data?.newOnboardedCompaniesPercentageChange}
      />
      <SummaryCard
        title="Active Maintenance plan"
        icon={MaintenanceIcon}
        value={data?.data?.activeSubscriptionsByMonth}
        isLoading={isLoading}
        percentChange={data?.data?.activeSubscriptionsPercentageChange}
        rangeText="Ongoing"
      />
      <SummaryCard
        title="Pending Approval"
        icon={ApprovalIcon}
        value={data?.data?.pendingFeedbacks}
        isLoading={isLoading}
        showRange={false}
        percentChange={data?.data?.pendingFeedbacksPercentageChange}
      />
      <SummaryCard
        title="Ticket Resolution Rate"
        icon={TicketSlantedIcon}
        value="92%"
        isLoading={isLoading}
        showRange={false}
        formatValue={false}
        percentChange={data?.data?.pendingFeedbacksPercentageChange}
      />
    </SimpleGrid>
  );
};

export default SectionOne;
