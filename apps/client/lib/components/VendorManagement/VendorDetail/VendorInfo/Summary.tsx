import { Flex, HStack, Text } from '@chakra-ui/react';

import { useAppSelector } from '~/lib/redux/hooks';

interface SummaryInfoProps {
  label: string;
  value: string | number | React.ReactElement | null;
  children?: React.ReactNode;
}
const SummaryInfo = (props: SummaryInfoProps) => {
  const { label, value, children } = props;
  return (
    <Flex direction="column" gap="8px">
      <Text size="md" color="neutral.600">
        {label}
      </Text>
      <Text size="lg" color="black">
        {value}
      </Text>
      {children}
    </Flex>
  );
};

const Summary = () => {
  const userData = useAppSelector((state) => state.user.user);

  if (!userData) {
    return null;
  }

  const SummaryData = [
    {
      label: 'Hired Date',
      value: 'August 22, 2024',
    },
    {
      label: 'Worked for',
      value: '0 years, 4 months',
    },
    {
      label: 'Employee ID',
      value: userData?.userId,
    },
    {
      label: 'NIN',
      value: '2752348-09238645',
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
      {SummaryData.map((item) => (
        <SummaryInfo {...item} key={item.label} />
      ))}
    </HStack>
  );
};

export default Summary;
