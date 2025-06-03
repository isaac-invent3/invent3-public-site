import {
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { AssetCategoryComplianceSummary } from '~/lib/interfaces/asset/compliance.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';
import AssetComplianceCategoryDetailDrawer from '../../Drawers/AssetComplianceCategoryDetailDrawer';

const SummaryInfo = ({ data }: { data: AssetCategoryComplianceSummary }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const categoryInfo = [
    {
      label: 'Total Asset',
      value: data?.totalAssets?.toLocaleString() ?? '-',
    },
    {
      label: 'Last Audit Date:',
      value: data?.lastAuditDate
        ? dateFormatter(data?.lastAuditDate, 'DD-MM-YYYY')
        : '-',
    },
    {
      label: 'No of Policy',
      value: data?.numberOfPolicies
        ? `${data?.numberOfPolicies > 10 ? '' : '0'}${data?.numberOfPolicies}`
        : '-',
    },
    {
      label: 'Next Audit Date:',
      value: data?.nextAuditDate
        ? dateFormatter(data?.nextAuditDate, 'DD-MM-YYYY')
        : '-',
    },
  ];
  return (
    <>
      <Stack
        minH="179px"
        height="full"
        p="16px"
        bgColor="primary.500"
        width="full"
        rounded="8px"
        spacing={0}
        direction={{ base: 'column', lg: 'row' }}
        justifyContent="space-between"
      >
        <Flex p="6px" gap="16px">
          <Flex position="relative" width="106px" height="106px">
            <Image src="/bms-location-1.png" fill alt="location" />
          </Flex>
          <VStack alignItems="flex-start" spacing="8px">
            <Text lineHeight="100%" color="neutral.300">
              Asset Category Name
            </Text>
            <Text
              fontWeight={800}
              fontSize="24px"
              lineHeight="100%"
              color="white"
            >
              {data?.assetCategoryName}
            </Text>
          </VStack>
        </Flex>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing="44px"
          alignItems="flex-start"
          pt="16px"
          pl="22px"
        >
          <SimpleGrid width="full" columns={2} spacing="24px">
            {categoryInfo.map((item, index) => (
              <VStack alignItems="flex-start" key={index} spacing="8px">
                <Text lineHeight="100%" color="neutral.300">
                  {item.label}
                </Text>
                <Text
                  fontWeight={800}
                  fontSize="16px"
                  lineHeight="100%"
                  color="white"
                >
                  {item.value}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
          <VStack alignItems="flex-start" spacing="8px">
            <Text fontWeight={800} color="white">
              Total Compliance Policies
            </Text>
            <HStack
              spacing={{ base: '24px', lg: '97px' }}
              alignItems="flex-end"
            >
              <Text
                fontWeight={800}
                fontSize="62px"
                lineHeight="100%"
                color="white"
              >
                {data?.totalCompliantPolicies ?? '-'}
              </Text>
              <Text
                fontWeight={700}
                color="#76C5FB"
                cursor="pointer"
                whiteSpace="nowrap"
                onClick={onOpen}
              >
                View All Policies
              </Text>
            </HStack>
          </VStack>
        </Stack>
      </Stack>
      {isOpen && (
        <AssetComplianceCategoryDetailDrawer
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
    </>
  );
};

export default SummaryInfo;
