import { Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import { useAppSelector } from '~/lib/redux/hooks';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';

interface SummaryInfoProps {
  label: string;
  value: string | number | React.ReactElement | null;
  children?: React.ReactNode;
}
const SummaryInfo = (props: SummaryInfoProps) => {
  const { label, value, children } = props;
  return (
    <Flex
      direction="column"
      gap="10px"
      bgColor="#FFFFFF99"
      p="16px"
      height="full"
      rounded="8px"
    >
      <Text color="neutral.600">{label}</Text>
      <Text fontSize="20px" lineHeight="100%" color="primary.500">
        {value}
      </Text>
      {children}
    </Flex>
  );
};

const Summary = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }

  const {
    lastMaintenanceDate,
    nextMaintenanceDate,
    y2DMaintenanceCost,
    currentCost,
  } = assetData;
  const Summary1 = [
    // {
    //   label: 'Utilization Rate',
    //   value: '85%',
    // },
    {
      label: 'Current Value',
      value: currentCost !== null ? amountFormatter(currentCost) : 'N/A',
    },
    {
      label: 'Maintenance Cost (YTD)',
      value:
        y2DMaintenanceCost !== null
          ? amountFormatter(y2DMaintenanceCost)
          : 'N/A',
    },
  ];

  const Summary2 = [
    {
      label: 'Last Maintenance Date',
      value:
        lastMaintenanceDate !== null
          ? dateFormatter(lastMaintenanceDate, 'Do MMM, YYYY')
          : 'N/A',
    },
    {
      label: 'Next Maintenance Date',
      value:
        nextMaintenanceDate !== null
          ? dateFormatter(nextMaintenanceDate, 'Do MMM, YYYY')
          : 'N/A',
    },
  ];
  return (
    <VStack width="full" alignItems="flex-start" spacing="8px">
      <Heading
        size="base"
        lineHeight="100%"
        fontWeight={700}
        color="primary.500"
      >
        Key Metrics
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 4 }}
        spacing="8px"
        alignItems="flex-start"
        width="full"
      >
        {Summary1.map((item) => (
          <SummaryInfo {...item} key={item.label} />
        ))}
        <SummaryInfo
          label="Last Maintenance Date"
          value={
            lastMaintenanceDate !== null
              ? dateFormatter(lastMaintenanceDate, 'Do MMM, YYYY')
              : 'N/A'
          }
          children={
            <Text
              py="4px"
              px="8px"
              rounded="16px"
              bgColor="neutral.300"
              color="black"
              fontWeight={700}
              fontSize="10px"
              lineHeight="130%"
              width="max-content"
            >
              Preventive
            </Text>
          }
        />
        <SummaryInfo
          label="Next Maintenance Date"
          value={
            nextMaintenanceDate !== null
              ? dateFormatter(nextMaintenanceDate, 'Do MMM, YYYY')
              : 'N/A'
          }
        />
      </SimpleGrid>
    </VStack>
  );
};

export default Summary;
