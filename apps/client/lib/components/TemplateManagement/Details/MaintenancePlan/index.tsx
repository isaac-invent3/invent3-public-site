'use client';

import { Flex, Skeleton, Stack, Text, VStack } from '@chakra-ui/react';
import DetailHeader from '../Common/Header';
import TemplateInfo from '../Common/TemplateInfo';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetMaintenancePlanByIdQuery } from '~/lib/redux/services/maintenance/plan.services';
import PlanInfo from '~/lib/components/Maintenance/Plans/PlanTemplateModal/Details/PlanInfo';
import Schedule from '~/lib/components/Maintenance/Plans/PlanTemplateModal/Details/Schedules';

const MaintenancePlan = () => {
  const template = useAppSelector((state) => state.template.template);
  const { data, isLoading } = useGetMaintenancePlanByIdQuery(
    { id: template?.contextId! },
    {
      skip: !template?.contextId,
    }
  );
  return (
    <Flex width="full" direction="column" pb="24px">
      <DetailHeader />
      <Flex width="full" mt="16px">
        <TemplateInfo />
      </Flex>
      <VStack
        alignItems="flex-start"
        width="full"
        px="16px"
        py="24px"
        bgColor="white"
        borderBottomRadius="8px"
        minH="60vh"
      >
        {isLoading && <Skeleton width="full" height="400px" rounded="8px" />}
        {!isLoading && data?.data && (
          <VStack width="full" spacing="40px" alignItems="flex-start">
            <VStack alignItems="flex-start" spacing="22px">
              <Text fontWeight={800} size="md">
                Maintenance Plan Detail
              </Text>
              <PlanInfo data={data?.data} type="secondary" />
            </VStack>
            <VStack alignItems="flex-start" width="full" spacing="8px">
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                spacing={{ base: '8px', lg: 0 }}
              >
                <Text fontWeight={800} color="black" size="md">
                  Schedules under the Plan
                </Text>
                <Text fontWeight={500} color="neutral.700">
                  (Select a Schedule to see the details)
                </Text>
              </Stack>

              <Schedule plan={data?.data} />
            </VStack>
          </VStack>
        )}
      </VStack>
    </Flex>
  );
};

export default MaintenancePlan;
