import { HStack, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react';

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
      <Stack
        width="full"
        rounded="8px"
        border="1px solid #BBBBBB80"
        direction={{ base: 'column', md: 'row' }}
        p="8px"
        alignItems="flex-start"
        justifyContent="space-between"
        spacing="16px"
      >
        {/* First Section Starts */}
        <HStack alignItems="flex-start" spacing="16px">
          <VStack
            spacing="2px"
            alignItems="flex-start"
            minW="110px"
            whiteSpace="nowrap"
          >
            <Text color="neutral.700">Start Date: </Text>
            <Text color="neutral.800" fontWeight={700}>
              {dateFormatter(data?.endDate, 'Do MMMM, YYYY') ?? 'N/A'}
            </Text>
          </VStack>
          <Text
            color="neutral.800"
            fontWeight={800}
            width="181px"
            maxW="1810px"
            fontSize="14px"
            lineHeight="21px"
          >
            {data?.planName}
          </Text>
        </HStack>
        {/* First Section Ends */}

        {/* Second Section Starts */}
        <HStack alignItems="flex-start" spacing="24px" flexWrap="wrap">
          <VStack
            alignItems="flex-start"
            spacing="8px"
            width="140px"
            maxW="140px"
          >
            <HStack spacing="8px">
              <Text width="78px" color="neutral.700">
                Plan Type:{' '}
              </Text>
              <Text>
                {data?.planTypeId === MAINTENANCE_PLAN_ENUM.default
                  ? 'Default'
                  : 'Customized'}
              </Text>
            </HStack>
            <HStack spacing="8px">
              <Text width="78px" color="neutral.700">
                Plan Scope:
              </Text>
              <Text>{data?.assetName ? 'Asset' : data?.groupTypeName}</Text>
            </HStack>
            :
            <HStack spacing="8px">
              <Text width="78px" color="neutral.700">
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
          <VStack spacing="4px" alignItems="flex-start">
            <Text color="neutral.700">Status: </Text>
            <GenericStatusBox text={data?.planStatusName} width="100px" />
          </VStack>
          <VStack
            spacing="2px"
            alignItems="flex-start"
            width="151px"
            maxW="115px"
          >
            <Text color="neutral.700">End Date: </Text>
            <Text color="neutral.800" fontWeight={700}>
              {dateFormatter(data?.endDate, 'Do MMMM, YYYY') ?? 'N/A'}
            </Text>
          </VStack>
        </HStack>
        {/* Second Section Ends */}
      </Stack>
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
