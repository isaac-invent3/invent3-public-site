import { Flex, Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import { MaintenanceColorCode } from '~/lib/utils/ColorCodes';
import { dateFormatter } from '~/lib/utils/Formatters';

interface MaintenanceCardProps {
  data: MaintenancePlan;
}
const MaintenanceCard = (props: MaintenanceCardProps) => {
  const { data } = props;
  const endTime = data?.durationInHours
    ? moment(data?.scheduledDate).add(data?.durationInHours, 'hours') // Add the duration if available
    : null;
  return (
    <Grid
      templateAreas={`"description contact status"`}
      gridTemplateRows="auto auto auto"
      gridTemplateColumns="30% 1fr 1fr"
      height="full"
      width="full"
      p="8px"
      border="1px solid #BBBBBB80"
      rounded="8px"
      justifyContent="space-between"
      gridColumnGap="81px"
      alignItems="flex-start"
    >
      {/* Description Starts Here */}
      <GridItem area="description">
        <HStack spacing="22px" alignItems="flex-start">
          <VStack spacing="2px">
            <Text color="neutral.600" size="md" fontWeight={500}>
              {dateFormatter(data?.scheduledDate, 'ddd')}
            </Text>

            <Text
              color="neutral.800"
              fontSize="24px"
              lineHeight="28.51px"
              fontWeight={800}
            >
              {dateFormatter(data?.scheduledDate, 'DD')}
            </Text>
            <Text
              color="neutral.800"
              fontWeight={800}
              letterSpacing="0.1em"
              textTransform="uppercase"
            >
              {dateFormatter(data?.scheduledDate, 'MMM')}
            </Text>
          </VStack>
          <VStack spacing="8px" alignItems="flex-start">
            <VStack alignItems="flex-start" spacing="2px">
              <Text color="neutral.800" size="lg" fontWeight={800}>
                {data?.planName}
              </Text>
              <Text color="neutral.600">{data?.typeName}</Text>
            </VStack>
            <VStack alignItems="flex-start" spacing="2px">
              <Text color="neutral.600">
                {dateFormatter(data?.scheduledDate, 'HH:mm')} -{' '}
                {endTime ? endTime.format('HH:mm') : 'N/A'}
              </Text>
              <Text color="neutral.600">Created By: N/A</Text>
            </VStack>
          </VStack>
        </HStack>
      </GridItem>
      {/* Description Ends Here */}
      {/* Contact Starts Here */}
      <GridItem area="contact">
        <VStack spacing="4px" alignItems="flex-start">
          <Text size="md" color="black">
            Contact Person
          </Text>
          <Text size="md" color="neutral.600">
            {data?.owner ?? 'N/A'}
          </Text>
          <Text size="md" color="neutral.600">
            {data?.ownerContactNo ?? 'N/A'}
          </Text>
          <Text size="md" color="neutral.600">
            {data?.ownerContactEmail ?? 'N/A'}
          </Text>
        </VStack>
      </GridItem>
      {/* Contact Ends Here */}
      {/* Status and Action Button */}
      <GridItem area="status" height="full">
        <Flex
          direction="column"
          height="full"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <VStack spacing="4px" alignItems="flex-start">
            <Text color="neutral.700">Status:</Text>
            <Text
              fontWeight={800}
              color={MaintenanceColorCode[data?.currentStatus as 'Completed']}
            >
              {data?.currentStatus ?? 'N/A'}
            </Text>
          </VStack>
          <Link href={`/maintenance?id=${data?.scheduleId}`}>
            <Text color="primary.main" fontWeight={700}>
              View Tasks
            </Text>
          </Link>
        </Flex>
      </GridItem>
      {/* Status and Action Button */}
    </Grid>
  );
};

export default MaintenanceCard;
