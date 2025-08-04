import { Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';

import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { useAppSelector } from '~/lib/redux/hooks';
import { MaintenanceColorCode } from '~/lib/utils/ColorCodes';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';

const SectionOne = () => {
  const formDetails = useAppSelector((state) => state.maintenance.scheduleForm);
  const planInfo = formDetails.maintenancePlanInfo;

  const scheduleCost = formDetails.tasks.reduce(
    (sum, task) => sum + (task.costEstimate ?? 0),
    0
  );

  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}
      rowGap="32px"
      columnGap="32px"
      width="full"
    >
      <GridItem colSpan={1} width="full">
        <VStack alignItems="flex-start" width="full" spacing="8px">
          <Text color="neutral.600" fontWeight={700}>
            Asset
          </Text>
          <Text color="black" maxW="80%">
            {formDetails.assetName}
          </Text>
          <Text color="neutral.600" fontWeight={800}>
            {formDetails.assetId}
          </Text>
        </VStack>
      </GridItem>
      <GridItem colSpan={1} width="full">
        <VStack alignItems="flex-start" width="full" spacing="8px">
          <Text color="neutral.600" fontWeight={700}>
            Location
          </Text>
          <Text color="black" maxW="80%">
            {formDetails.assetLocation}
          </Text>
        </VStack>
      </GridItem>

      <GridItem colSpan={{ base: 1 }} width="full">
        <VStack alignItems="flex-start" spacing="8px">
          <Text color="neutral.600" fontWeight={700}>
            Maintenance Plan
          </Text>
          <HStack spacing="8px">
            <Text color="black">{planInfo?.planName}</Text>
            <GenericStatusBox
              text={planInfo?.planStatus as string}
              colorCode={
                MaintenanceColorCode[planInfo?.planStatus as 'Not Started']
              }
            />
          </HStack>
          <Text color="neutral.600">
            Asset Type:{' '}
            <Text as="span" color="black">
              {planInfo?.assetTypeName ?? 'N/A'}
            </Text>
          </Text>
          <Text color="black">
            {planInfo?.startDate &&
              dateFormatter(planInfo?.startDate, 'Do MMM, YYYY')}{' '}
            {'  '} -{'  '}
            {planInfo?.endDate
              ? dateFormatter(planInfo?.endDate, 'Do MMM, YYYY')
              : 'N/A'}
          </Text>
        </VStack>
      </GridItem>
      <GridItem colSpan={1} width="full">
        <VStack alignItems="flex-start" width="full" spacing="8px">
          <Text color="neutral.600" fontWeight={700}>
            Estimate Cost
          </Text>
          <Text color="black" maxW="80%">
            {amountFormatter(scheduleCost)}
          </Text>
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default SectionOne;
