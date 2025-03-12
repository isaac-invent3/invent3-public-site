import { Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import Info from './Info';

const Subscription = () => {
  const { startDate, subscriptionPlanId, endDate } = useAppSelector(
    (state) => state.company.companyForm
  );

  return (
    <VStack spacing="8px" width="full" alignItems="flex-start">
      <DetailHeader variant="primary">Subscription</DetailHeader>
      <VStack width="full" spacing="24px" alignItems="flex-start">
        <Info label="Subscription" value={subscriptionPlanId} />

        <VStack width="full" spacing="4px" alignItems="flex-start">
          <Text color="neutral.600">Start Date</Text>

          <Button customStyles={{ height: '37px', py: '10px' }}>
            {startDate}
          </Button>
        </VStack>
        <VStack width="full" spacing="4px" alignItems="flex-start">
          <Text color="neutral.600">End Date</Text>

          <Button customStyles={{ height: '37px', py: '10px' }}>
            {endDate}
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Subscription;
