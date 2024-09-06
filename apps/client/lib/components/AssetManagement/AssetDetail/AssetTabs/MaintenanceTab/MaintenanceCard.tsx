import { Flex, Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { MaintenanceColorCode } from '~/lib/utils/ColorCodes';
import { dateFormatter } from '~/lib/utils/Formatters';

interface MaintenanceCardProps {
  description: {
    id: string;
    name: string;
    type: string;
    date: string;
    time: string;
    by: string;
  };
  contactPerson: {
    name: string;
    phoneNumber: string;
    email: string;
  };
  status: string;
}
const MaintenanceCard = (props: MaintenanceCardProps) => {
  const { description, contactPerson, status } = props;
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
              {dateFormatter(description.date, 'ddd')}
            </Text>

            <Text
              color="neutral.800"
              fontSize="24px"
              lineHeight="28.51px"
              fontWeight={800}
            >
              {dateFormatter(description.date, 'DD')}
            </Text>
            <Text
              color="neutral.800"
              fontWeight={800}
              letterSpacing="0.1em"
              textTransform="uppercase"
            >
              {dateFormatter(description.date, 'MMM')}
            </Text>
          </VStack>
          <VStack spacing="8px" alignItems="flex-start">
            <VStack alignItems="flex-start" spacing="2px">
              <Text color="neutral.800" size="lg" fontWeight={800}>
                {description.name}
              </Text>
              <Text color="neutral.600">{description.type}</Text>
            </VStack>
            <VStack alignItems="flex-start" spacing="2px">
              <Text color="neutral.600">{description.time}</Text>
              <Text color="neutral.600">By: {description.by}</Text>
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
            {contactPerson.name}
          </Text>
          <Text size="md" color="neutral.600">
            {contactPerson.phoneNumber}
          </Text>
          <Text size="md" color="neutral.600">
            {contactPerson.email}
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
              color={MaintenanceColorCode[status as 'completed']}
            >
              {status}
            </Text>
          </VStack>
          <Link href="#">
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
