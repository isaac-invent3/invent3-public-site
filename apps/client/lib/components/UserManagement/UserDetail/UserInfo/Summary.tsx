import { Flex, SimpleGrid, Text } from '@chakra-ui/react';

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
      <Text size={{ base: 'base', md: 'lg' }} color="black">
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
    <SimpleGrid
      width="full"
      columns={{ base: 2, md: 4 }}
      p="16px"
      px={{ base: '13px', lg: '16px' }}
      borderWidth="0.7px"
      borderColor="#BBBBBBB2"
      rounded="8px"
      justifyContent="space-between"
      alignItems="flex-start"
      gap={{ base: '29px' }}
    >
      {SummaryData.map((item) => (
        <SummaryInfo {...item} key={item.label} />
      ))}
    </SimpleGrid>
  );
};

export default Summary;
