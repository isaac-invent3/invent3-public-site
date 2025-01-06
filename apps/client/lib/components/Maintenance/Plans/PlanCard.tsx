import { HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';

import useSlugAction from '~/lib/hooks/useSlugAction';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';
import {
  MAINTENANCE_PLAN_ENUM,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import GenericStatusBox from '../../UI/GenericStatusBox';
import ScheduleDetailDrawer from '../Schedules/ScheduleDetailDrawer';

interface PlanCardProps {
  data: MaintenancePlan;
}
const PlanCard = (props: PlanCardProps) => {
  const { data } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { closeAction, openAction } = useSlugAction({
    slugAction: onOpen,
    slugName: SYSTEM_CONTEXT_DETAILS.MAINTENANCE_PLANS.slug,
    slugComparator: data.maintenancePlanId,
    onCloseHandler: onClose,
  });

  return (
    <>
      <HStack
        width="full"
        rounded="8px"
        border="1px solid #BBBBBB80"
        p="8px"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        {/* First Section Starts */}
        <HStack alignItems="flex-start" spacing="24px">
          <VStack spacing="2px" alignItems="flex-start">
            <Text color="neutral.700" size="md" width="120px">
              Start Date:{' '}
            </Text>
            <Text color="neutral.800" fontWeight={700}>
              {dateFormatter(data?.endDate, 'Do MMMM, YYYY') ?? 'N/A'}
            </Text>
          </VStack>
          <Text
            color="neutral.800"
            width="140px"
            maxW="140px"
            fontWeight={800}
            fontSize="14px"
            lineHeight="21px"
          >
            {data?.planName}
          </Text>

          <VStack
            alignItems="flex-start"
            spacing="8px"
            width="140px"
            maxW="140px"
          >
            <HStack spacing="8px">
              <Text width="78px" size="md" fontWeight={800} color="neutral.600">
                Plan Type:{' '}
              </Text>
              <Text>
                {data?.planTypeId === MAINTENANCE_PLAN_ENUM.default
                  ? 'Default'
                  : 'Customized'}
              </Text>
            </HStack>
            <HStack spacing="8px">
              <Text width="78px" size="md" fontWeight={800} color="neutral.600">
                Plan Scope:
              </Text>
              <Text>{data?.assetName ? 'Asset' : data?.groupTypeName}</Text>
            </HStack>
            :
            <HStack spacing="8px">
              <Text width="78px" size="md" fontWeight={800} color="neutral.600">
                Schedules:
              </Text>
              <Text
                fontWeight={700}
                textDecoration="underline"
                role="button"
                color="#0366EF"
                onClick={openAction}
              >
                {data?.activeSchedules < 10 ? 0 : ''}
                {data?.activeSchedules}
              </Text>
            </HStack>
          </VStack>
        </HStack>
        {/* First Section Ends */}
        <VStack spacing="4px" alignItems="flex-start" width="100px">
          <Text color="neutral.700" size="md">
            Status:{' '}
          </Text>
          <GenericStatusBox text={data?.planStatusName} />
        </VStack>
        <VStack
          spacing="2px"
          alignItems="flex-start"
          width="151px"
          maxW="120px"
        >
          <Text color="neutral.700" size="md">
            End Date:{' '}
          </Text>
          <Text color="neutral.800" fontWeight={700}>
            {dateFormatter(data?.endDate, 'Do MMMM, YYYY') ?? 'N/A'}
          </Text>
        </VStack>
      </HStack>
      {isOpen && (
        <ScheduleDetailDrawer
          isOpen={isOpen}
          onClose={closeAction}
          planId={data?.maintenancePlanId}
        />
      )}
    </>
  );
};

export default PlanCard;
