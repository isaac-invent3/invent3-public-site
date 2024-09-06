import { Flex, Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { MaintenanceColorCode } from '~/lib/utils/ColorCodes';
import { dateFormatter } from '~/lib/utils/Formatters';

interface DetailProps {
  children: React.ReactNode;
  customStyles?: { [key: string]: unknown };
}
const Detail = (props: DetailProps) => {
  const { children, customStyles } = props;

  return (
    <Text
      fontSize="14px"
      lineHeight="16.63px"
      color="neutral.600"
      fontWeight={500}
      {...customStyles}
    >
      {children}
    </Text>
  );
};

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
            <Text
              color="neutral.600"
              fontSize="14px"
              lineHeight="16.63px"
              fontWeight={500}
            >
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
              fontSize="12px"
              lineHeight="14.26px"
              fontWeight={800}
              letterSpacing="0.1em"
              textTransform="uppercase"
            >
              {dateFormatter(description.date, 'MMM')}
            </Text>
          </VStack>
          <VStack spacing="8px" alignItems="flex-start">
            <VStack alignItems="flex-start" spacing="2px">
              <Text
                color="neutral.800"
                fontSize="16px"
                lineHeight="19.01px"
                fontWeight={800}
              >
                {description.name}
              </Text>
              <Text
                color="neutral.600"
                fontSize="12px"
                lineHeight="14.26px"
                fontWeight={500}
              >
                {description.type}
              </Text>
            </VStack>
            <VStack alignItems="flex-start" spacing="2px">
              <Text
                color="neutral.600"
                fontSize="12px"
                lineHeight="14.26px"
                fontWeight={500}
              >
                By: {description.time}
              </Text>
              <Text
                color="neutral.600"
                fontSize="12px"
                lineHeight="14.26px"
                fontWeight={500}
              >
                By: {description.by}
              </Text>
            </VStack>
          </VStack>
        </HStack>
      </GridItem>
      {/* Description Ends Here */}
      {/* Contact Starts Here */}
      <GridItem area="contact">
        <VStack spacing="4px" alignItems="flex-start">
          <Detail customStyles={{ color: 'black' }}>Contact Person</Detail>
          <Detail>{contactPerson.name}</Detail>
          <Detail>{contactPerson.phoneNumber}</Detail>
          <Detail>{contactPerson.email}</Detail>
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
            <Text
              fontSize="12px"
              fontWeight={500}
              lineHeight="14.26px"
              color="neutral.700"
            >
              Status:
            </Text>
            <Text
              fontSize="12px"
              fontWeight={800}
              lineHeight="14.26px"
              color={MaintenanceColorCode[status as 'completed']}
            >
              {status}
            </Text>
          </VStack>
          <Link href="#">
            <Text
              color="primary.main"
              fontSize="12px"
              fontWeight={700}
              lineHeight="14.26px"
            >
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
