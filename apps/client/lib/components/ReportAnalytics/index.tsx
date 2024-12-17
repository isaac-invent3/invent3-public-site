'use client';

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { TicketFilterInput } from '~/lib/interfaces/ticket.interfaces';
import { useGetAllSavedReportsQuery } from '~/lib/redux/services/reports.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import GeneralFilter from './Filters/GeneralFilter';
import Header from './Header';
import TopBranchesChart from './TestChart';

const ReportAnalytics = () => {
  const getTodayDate = () => {
    return dateFormatter(new Date(), 'DD-MM-YYYY') as string;
  };

  const initialFilters = {
    region: [],
    area: [],
    branch: [],
    fromDate: getTodayDate(),
    toDate: getTodayDate(),
  };

  const [filterData, setFilterData] =
    useState<TicketFilterInput>(initialFilters);

  const clearFilters = () => {
    setFilterData(initialFilters);
  };

  const cardData = [
    { title: 'Total Assets', value: '108,098', link: 'View Report' },
    { title: 'New Assets Added', value: '12', link: 'View Report' },
    {
      title: 'Total Assets Disposed',
      value: '12',
      link: 'View Report',
      color: 'red.500',
    },
    { title: 'Maintenance Cost', value: '$9,500', link: 'View Report' },
    { title: 'Total Maintenance Plan', value: '425', link: 'View Report' },
    { title: 'Total Tasks', value: '650', link: 'View Report' },
  ];

  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllSavedReportsQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });

  // TODO: Split it into Custom Components

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />

      <GeneralFilter
        filterData={filterData}
        setFilterData={setFilterData}
        clearFilters={clearFilters}
      />

      <HStack
        alignItems="center"
        width="full"
        mt={10}
        paddingBlock="2rem"
        borderBlock="1px solid #BBBBBB"
        justifyContent="space-between"
      >
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            xl: 'repeat(3, 1fr)',
          }}
          width={{ base: '100%', xl: '50%' }}
          gap="16px"
        >
          {cardData.map((card, index) => (
            <GridItem
              key={index}
              bg="white"
              p="16px"
              borderRadius="md"
              border="1px solid #F2F1F1"
              height="144px"
            >
              <VStack
                align="start"
                height="100%"
                justifyContent="space-between"
              >
                <VStack align="start" spacing="16px">
                  <Text
                    color={card.color ?? '#42403D'}
                    fontWeight={500}
                    fontSize="14px"
                  >
                    {card.title}
                  </Text>

                  <Heading
                    fontSize="36px"
                    lineHeight="38.02px"
                    fontWeight={800}
                    color={card.color ?? '#0E2642'}
                  >
                    {card.value}
                  </Heading>
                </VStack>

                <Link color="#0366EF" fontWeight="500" fontSize="12px" href="#">
                  {card.link}
                </Link>
              </VStack>
            </GridItem>
          ))}
        </Grid>

        <TopBranchesChart />
      </HStack>

      <VStack>
        <HStack
          alignItems="center"
          justifyContent="space-between"
          width="full"
          mt="5"
        >
          <Text color="#0E2642" fontSize={14} fontWeight={500}>
            Default Reports
          </Text>

          <Link color="#0366EF" fontWeight="700" fontSize="12px" href="#">
            See all Default Reports
          </Link>
        </HStack>

        <HStack
          gap="16px"
          overflowX="scroll"
          maxW="full"
          justifyContent="space-between"
          alignItems="start"
          mt="10px"
        >
          {Array.from({ length: 10 }, (_, index) => (
            <Box
              key={index}
              bg="white"
              p="12px"
              borderRadius="md"
              border="1px solid #F2F1F1"
              height="200px"
              minWidth={200}
            >
              <VStack
                alignItems="start"
                height="full"
                justifyContent="space-between"
              >
                <VStack alignItems="start">
                  <Heading
                    fontSize={14}
                    fontWeight={700}
                    color="#0E2642"
                    lineHeight="16.63px"
                  >
                    Total Assets with no usage over the last month
                  </Heading>

                  <Text
                    color="#838383"
                    fontSize="14px"
                    fontWeight="700"
                    lineHeight="16.63px"
                  >
                    Created by: Admin
                  </Text>
                  <Text lineHeight="14.26px" fontWeight="500">
                    12th Nov 2024
                  </Text>
                </VStack>

                <Link
                  color="#0366EF"
                  fontWeight="500"
                  fontSize="12px"
                  href={`/report-analytics/${index}`}
                >
                  View Report
                </Link>
              </VStack>
            </Box>
          ))}
        </HStack>
      </VStack>

      <VStack mt="5">
        <HStack
          alignItems="center"
          justifyContent="space-between"
          width="full"
          mt="5"
        >
          <Text color="#0E2642" fontSize={14} fontWeight={500}>
            Saved Templates
          </Text>

          <Link color="#0366EF" fontWeight="700" fontSize="12px" href="#">
            See all Saved Templates
          </Link>
        </HStack>

        <HStack
          gap="16px"
          overflowX="scroll"
          maxW="full"
          justifyContent="space-between"
          alignItems="start"
          mt="10px"
        >
          {Array.from({ length: 10 }, (_, index) => (
            <Box
              key={index}
              bg="white"
              p="12px"
              borderRadius="md"
              border="1px solid #F2F1F1"
              height="200px"
              minWidth={200}
            >
              <VStack
                alignItems="start"
                height="full"
                justifyContent="space-between"
              >
                <VStack alignItems="start">
                  <Heading
                    fontSize={14}
                    fontWeight={700}
                    color="#0E2642"
                    lineHeight="16.63px"
                  >
                    Total Assets with no usage over the last month
                  </Heading>

                  <Text
                    color="#838383"
                    fontSize="14px"
                    fontWeight="700"
                    lineHeight="16.63px"
                  >
                    Created by: Admin
                  </Text>
                  <Text lineHeight="14.26px" fontWeight="500">
                    12th Nov 2024
                  </Text>
                </VStack>

                <Link color="#0366EF" fontWeight="500" fontSize="12px" href="#">
                  Generate Report
                </Link>
              </VStack>
            </Box>
          ))}
        </HStack>
      </VStack>
    </Flex>
  );
};

export default ReportAnalytics;
