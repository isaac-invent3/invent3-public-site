import { Divider, Flex, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';
import PlanInfo from './PlanInfo';
import Schedule from './Schedules';

interface DetailsProps {
  data: MaintenancePlan;
}
const Details = (props: DetailsProps) => {
  const { data } = props;
  return (
    <VStack
      width="full"
      alignItems="flex-start"
      bgColor="neutral.200"
      pt="14px"
      pb="19px"
      px="16px"
      spacing={0}
      mt="8px"
      rounded="6px"
      mb="16px"
    >
      <Text fontWeight={800}>Template's Detail</Text>
      <VStack width="full" alignItems="flex-start" my="24px" spacing="32px">
        <PlanInfo data={data} />
        <Schedule plan={data} />
      </VStack>
      <Divider width="full" border="0.5px solid #656565" />
      <Flex width="full" justifyContent="flex-end" pt="16px">
        <Button customStyles={{ width: '161px' }}>Use Template</Button>
      </Flex>
    </VStack>
  );
};

export default Details;
