import { SimpleGrid, Text, VStack } from '@chakra-ui/react';

import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { MAINTENANCE_PLAN_ENUM } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';

interface PlanInfoProps {
  data: MaintenancePlan;
  type?: 'primary' | 'secondary';
}

const PlanInfo = (props: PlanInfoProps) => {
  const { data, type = 'primary' } = props;
  const isCustomPlan = data?.planTypeId === MAINTENANCE_PLAN_ENUM.custom;
  const isPrimary = type === 'primary';
  const prefix = !isPrimary ? 'Plan' : '';
  const info = [
    {
      label: isCustomPlan ? 'Asset' : data?.groupTypeName,
      value: isCustomPlan ? data?.assetName : data?.assetGroupContextName,
    },
    {
      label: `${prefix} Start Date`,
      value: data?.startDate
        ? dateFormatter(data?.startDate, 'Do MMM, YYYY')
        : 'N/A',
    },
    {
      label: `${prefix} End Date`,
      value: data?.endDate
        ? dateFormatter(data?.endDate, 'Do MMM, YYYY')
        : 'N/A',
    },
  ];

  return (
    <SimpleGrid
      width="full"
      columns={{ base: 2, sm: 3 }}
      spacing="47px"
      bgColor={isPrimary ? 'primary.500' : 'none'}
      p={isPrimary ? '16px' : '0px'}
      roundedTop="8px"
      alignItems="flex-start"
    >
      {info.map((item, index) => (
        <VStack alignItems="flex-start" spacing="8px" key={index}>
          <Text color={isPrimary ? 'neutral.300' : 'neutral.600'}>
            {item.label}
          </Text>
          <Text
            color={isPrimary ? 'white' : 'black'}
            fontWeight={700}
            fontSize="14px"
            lineHeight="22px"
          >
            {item.value}
          </Text>
        </VStack>
      ))}
    </SimpleGrid>
  );
};

export default PlanInfo;
