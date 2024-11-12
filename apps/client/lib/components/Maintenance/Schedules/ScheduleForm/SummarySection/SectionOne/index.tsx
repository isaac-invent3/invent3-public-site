import { Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { useAppSelector } from '~/lib/redux/hooks';
import { MaintenanceColorCode } from '~/lib/utils/ColorCodes';
import { dateFormatter } from '~/lib/utils/Formatters';

const SectionOne = () => {
  const formDetails = useAppSelector((state) => state.maintenance.scheduleForm);
  const planInfo = formDetails.maintenancePlanInfo;

  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      rowGap="32px"
      columnGap={0}
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

      <GridItem colSpan={2} width="full">
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
            {planInfo?.endDate &&
              dateFormatter(planInfo?.endDate, 'Do MMM, YYYY')}
          </Text>
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default SectionOne;
