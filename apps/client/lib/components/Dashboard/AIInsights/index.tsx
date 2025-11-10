'use client';

import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import PageHeader from '../../UI/PageHeader';
import Summary from './Summary';
import AITabs from './AITabs';
import AIInsightFeeds from './AIInsightFeeds';
import ExportButton from '../../UI/ExportButton';
import { downloadPageAsPDF } from '~/lib/utils/pdfUtils';

const AIInsightsDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      setIsLoading(true);
      await downloadPageAsPDF({
        elementId: 'ai-insights',
        fileName: 'AI_Insights.pdf',
        excludeSelectors: ['.no-pdf'],
        headingId: 'page-heading',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      id="ai-insights"
      width="full"
      direction="column"
      gap="14px"
      pb="16px"
      px={{ base: '16px', md: 0 }}
    >
      <HStack width="full" justifyContent="space-between">
        <VStack width="full" alignItems="flex-start" spacing="8px" pb="26px">
          <PageHeader id="page-heading">AI Insights Dashboard</PageHeader>
          <Text color="#6E7D8E" fontWeight={700} size="md">
            Real-time analytics and predictive intelligence for proactive
            facility operations.
          </Text>
        </VStack>
        <ExportButton handleClick={handleDownloadPDF} isLoading={isLoading} />
      </HStack>
      <Summary />
      <AITabs />
      <AIInsightFeeds />
    </Flex>
  );
};

export default AIInsightsDashboard;
