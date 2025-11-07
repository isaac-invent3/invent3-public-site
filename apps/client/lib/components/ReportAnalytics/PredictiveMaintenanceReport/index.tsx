import { HStack, Stack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { ROUTES } from '~/lib/utils/constants';
import PredictiveCard from './PredictiveCard';

const PredictiveMaintenanceReport = () => {
  const allReports = [
    {
      title: 'Predictive Failure Benchmarking',
      description:
        'Allow comparison of predictive maintenance performance and model.',
      route: '#',
    },
    {
      title: 'Drill-Down Failure Explanation',
      description:
        'Show which parameters contributed most to a predicted failure',
      route: '#',
    },
    {
      title: 'Cross-Facility LifeCycle Comparison',
      description:
        'Show which parameters contributed most to a predicted failure',
      route: `/${ROUTES.LOCATION}/cross-facility`,
    },
    {
      title: 'Predictive SLA Compliance',
      description:
        'Monitor how predictive maintenance tasks align with defined SLA rules and deadlines.',
      route: `/${ROUTES.REPORT}/predictive-sla-compliance`,
    },
  ];
  return (
    <VStack spacing={4} width="full" alignItems="flex-start">
      <HStack
        alignItems="center"
        justifyContent="space-between"
        width="full"
        mt="5"
      >
        <Text color="#0E2642" size="md" fontWeight={700}>
          Predictive Maintenance
        </Text>

        <Link href="#">
          <Text fontWeight={700} color="#0366EF">
            See all Predictive Maintenance Reports
          </Text>
        </Link>
      </HStack>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing={4}
        alignItems="flex-start"
        width="full"
        flexWrap="wrap"
      >
        {allReports.map((item, index) => (
          <PredictiveCard {...item} key={index} />
        ))}
      </Stack>
    </VStack>
  );
};

export default PredictiveMaintenanceReport;
