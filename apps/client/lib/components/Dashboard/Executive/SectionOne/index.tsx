import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import {
  ApprovalIcon,
  MaintenanceIcon,
  TicketSlantedIcon,
} from '~/lib/components/CustomIcons/Dashboard';
import SummaryCard from '../../Common/Summaries/SummaryCardWithPercentChange';
import { AssetManagementIcon } from '~/lib/components/CustomIcons/layout';
import { formatNumberShort } from '~/lib/utils/helperFunctions';
import { useGetDashboardStatQuery } from '~/lib/redux/services/dashboard/executive.services';

const SectionOne = () => {
  const { data, isLoading } = useGetDashboardStatQuery();
  return (
    <SimpleGrid
      width="full"
      gap="16px"
      columns={{ base: 1, sm: 2, md: 3, xl: 5 }}
    >
      <SummaryCard
        title="Total Asset Managed Under Management"
        icon={AssetManagementIcon}
        value={data?.data?.totalAssetsManaged}
        isLoading={isLoading}
        showRange={false}
        percentChange={data?.data?.totalAssetsManagedPercentageChange}
        progressText="Growth Year on Year"
      />
      <SummaryCard
        title="Total Asset Value"
        icon={AssetManagementIcon}
        value={`$${formatNumberShort(data?.data?.totalAssetValue ?? 0)}`}
        isLoading={isLoading}
        showRange={false}
        percentChange={data?.data?.totalAssetValuePercentageChange}
      />
      <SummaryCard
        title="Active Maintenance plan"
        icon={MaintenanceIcon}
        value={data?.data?.activeMaintenancePlans}
        isLoading={isLoading}
        percentChange={data?.data?.activeMaintenancePlansPercentageChange}
        rangeText="Ongoing"
      />
      <SummaryCard
        title="Pending Approval"
        icon={ApprovalIcon}
        value={data?.data?.pendingApproval}
        isLoading={isLoading}
        showRange={false}
        percentChange={data?.data?.pendingApprovalPercentageChange}
      />
      <SummaryCard
        title="Ticket Resolution Rate"
        icon={TicketSlantedIcon}
        value={`${data?.data?.ticketResolutionRate ?? 0}%`}
        isLoading={isLoading}
        showRange={false}
        formatValue={false}
        percentChange={data?.data?.ticketResolutionRatePercentageChange}
      />
    </SimpleGrid>
  );
};

export default SectionOne;
