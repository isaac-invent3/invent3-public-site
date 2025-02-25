import { HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  AssetBoxIcon,
  Company2Icon,
  TaskIcon,
} from '~/lib/components/CustomIcons/Dashboard';
import SummaryCard from '../../Common/Summaries/SummaryCardWithPercentChange';
import { CalendarIcon } from '~/lib/components/CustomIcons';
import { CustomBadge } from '@repo/ui/components';
import { useGetDashboardStatQuery } from '~/lib/redux/services/dashboard/thirdparty.services';

const SectionOne = () => {
  const { data, isLoading } = useGetDashboardStatQuery();
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing="16px" width="full">
      <SummaryCard
        title="Total Managed Companies"
        icon={Company2Icon}
        value={data?.data?.totalManagedCompanies}
        isLoading={isLoading}
        showRange={false}
        showIconBgColor={false}
        textSize="base"
        formatValue
        iconStyle={{ boxSize: '24px' }}
      >
        <HStack spacing="4px">
          <CustomBadge badgeColor="#F50000" badgeContent={20} />
          <Text color="neutral.600" fontWeight={700}>
            <Text as="span" color="black" fontWeight={800}>
              NOT
            </Text>{' '}
            Active
          </Text>
        </HStack>
      </SummaryCard>
      <SummaryCard
        title="Total Assets being Managed"
        icon={AssetBoxIcon}
        value={data?.data?.totalAssetsBeingManaged}
        isLoading={isLoading}
        showRange={false}
        showIconBgColor={false}
        formatValue
        textSize="base"
        iconStyle={{ boxSize: '24px' }}
      >
        <HStack spacing="4px">
          <CustomBadge badgeColor="#0366EF" badgeContent={12000} />
          <Text color="neutral.600" fontWeight={700}>
            Asset{' '}
            <Text as="span" color="black" fontWeight={800}>
              NOT
            </Text>{' '}
            in Use
          </Text>
        </HStack>
      </SummaryCard>
      <SummaryCard
        title="Upcoming Maintenance"
        icon={CalendarIcon}
        value={data?.data?.upcomingMaintenanceThisWekk}
        isLoading={isLoading}
        showRange={true}
        formatValue
        rangeText="This Week"
        showIconBgColor={false}
        textSize="base"
        iconStyle={{ boxSize: '24px' }}
      >
        <HStack spacing="4px">
          <CustomBadge
            badgeColor="#D54801"
            badgeContent={'05'}
            py="2px"
            px="5px"
          />
          <Text color="neutral.600" fontWeight={700}>
            Today
          </Text>
        </HStack>
      </SummaryCard>
      <SummaryCard
        title="Task Overview"
        icon={TaskIcon}
        formatValue
        value={data?.data?.taskOverviewThisMonth}
        isLoading={isLoading}
        showRange={true}
        showIconBgColor={false}
        textSize="base"
        iconStyle={{ boxSize: '24px' }}
      >
        <VStack width="full" alignItems="flex-start" spacing="8px">
          <HStack spacing="4px">
            <CustomBadge
              badgeColor="#07CC3B"
              badgeContent={data?.data?.tasksCompletedThisMonth}
              py="2px"
              px="5px"
            />
            <Text color="neutral.600" fontWeight={700}>
              Task Completed
            </Text>
          </HStack>
          <HStack spacing="4px">
            <CustomBadge
              badgeColor="#F50000"
              badgeContent={data?.data?.tasksNotCompletedThisMonth}
              py="2px"
              px="5px"
            />
            <Text color="neutral.600" fontWeight={700}>
              Task{' '}
              <Text as="span" color="black" fontWeight={800}>
                NOT
              </Text>{' '}
              Completed
            </Text>
          </HStack>
        </VStack>
      </SummaryCard>
    </SimpleGrid>
  );
};

export default SectionOne;
