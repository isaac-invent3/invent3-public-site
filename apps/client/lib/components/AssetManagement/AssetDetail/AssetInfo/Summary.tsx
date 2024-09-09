import { Flex, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '~/lib/redux/hooks';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';

interface SummaryInfoProps {
  label: string;
  value: string | number | React.ReactElement;
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
  const { initialValue, dateCreated } = assetData;
  const Summary1 = [
    // {
    //   label: 'Utilization Rate',
    //   value: '85%',
    // },
    {
      label: 'Current Cost',
      value: amountFormatter(initialValue ?? 0),
    },
  ];

  const Summary2 = [
    {
      label: 'Last Repair Date',
      value: dateFormatter(dateCreated, 'Do MMM, YYYY'),
    },
    {
      label: 'Next Maintenance Date',
      value: dateFormatter(dateCreated, 'Do MMM, YYYY'),
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
        <SummaryInfo
          label="Maintenance Cost"
          value={amountFormatter(initialValue ?? 0)}
        >
          <HStack
            color="#00A129"
            spacing="4px"
            fontWeight={700}
            fontSize="10px"
            lineHeight="#00A129"
            mt="4px"
          >
            <Text fontSize="10px" lineHeight="#00A129">
              YTD:
            </Text>
            <Text fontSize="10px" lineHeight="#00A129">
              N20,000
            </Text>
          </HStack>
        </SummaryInfo>
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
