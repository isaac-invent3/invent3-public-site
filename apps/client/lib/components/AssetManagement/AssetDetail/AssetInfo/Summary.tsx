import { Flex, HStack, Text } from '@chakra-ui/react';

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
    <Flex direction="column">
      <Text size="md" mb="8px" color="neutral.600">
        {label}
      </Text>
      <Text size="md" color="black">
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
    initialValue,
    y2DMaintenanceCost,
  } = assetData;
  const Summary1 = [
    // {
    //   label: 'Utilization Rate',
    //   value: '85%',
    // },
    {
      label: 'Purchase Cost',
      value: initialValue !== null ? amountFormatter(initialValue) : 'N/A',
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
    <HStack
      width="full"
      p="16px"
      borderWidth="0.7px"
      borderColor="#BBBBBBB2"
      rounded="8px"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <HStack spacing="24px" alignItems="flex-start">
        {Summary1.map((item) => (
          <SummaryInfo {...item} key={item.label} />
        ))}
      </HStack>
      <HStack spacing="24px">
        {Summary2.map((item) => (
          <SummaryInfo {...item} key={item.label} />
        ))}
      </HStack>
    </HStack>
  );
};

export default Summary;
