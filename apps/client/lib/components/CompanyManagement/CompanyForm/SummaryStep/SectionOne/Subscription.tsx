import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import Info from './Info';
import { dateFormatter } from '~/lib/utils/Formatters';

const Subscription = () => {
  const { startDate, subscriptionPlanName, endDate } = useAppSelector(
    (state) => state.company.companyForm
  );

  const row2 = [
    {
      label: 'Subscription',
      value: subscriptionPlanName,
    },
    {
      label: 'Start Date',
      value: startDate
        ? dateFormatter(startDate, 'MMMM DD, YYYY', 'DD/MM/YYYY')
        : 'N/A',
    },
    {
      label: 'End Date',
      value: endDate
        ? dateFormatter(endDate, 'MMMM DD, YYYY', 'DD/MM/YYYY')
        : 'N/A',
    },
  ];

  return (
    <VStack
      spacing="8px"
      width="full"
      alignItems="flex-start"
      bgColor="#F5F5F5"
      height="full"
      rounded="16px"
      p="16px"
    >
      <DetailHeader variant="primary">Subscription</DetailHeader>
      <SimpleGrid columns={{ base: 1, md: 3 }} width="full" gap="16px">
        {row2.map((item) => (
          <Info {...item} key={item.label} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default Subscription;
