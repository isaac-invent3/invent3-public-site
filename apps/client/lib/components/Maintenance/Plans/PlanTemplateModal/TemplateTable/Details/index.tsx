import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import PlanInfo from './PlanInfo';
import Schedule from './Schedules';
import { Template } from '~/lib/interfaces/template.interfaces';
import { useGetMaintenancePlanByIdQuery } from '~/lib/redux/services/maintenance/plan.services';

interface DetailsProps {
  template: Template;
}
const Details = (props: DetailsProps) => {
  const { template } = props;
  const { data } = useGetMaintenancePlanByIdQuery(template.contextId, {
    skip: !template.contextId,
  });
  return (
    <VStack
      width="full"
      alignItems="flex-start"
      pt="14px"
      pb="19px"
      px="16px"
      spacing="16px"
      mt="8px"
      rounded="6px"
      mb="16px"
    >
      <Heading fontWeight={800} fontSize="18px" lineHeight="21.38px">
        Template's Detail
      </Heading>
      <VStack width="full" alignItems="flex-start" spacing={0}>
        {<PlanInfo data={data} />}
        <VStack
          width="full"
          alignItems="flex-start"
          pt="26px"
          spacing="16px"
          px="8px"
          pb="8px"
          borderTop="0px"
          borderWidth="1px"
          borderColor="neutral.300"
          borderBottomRadius="8px"
        >
          <VStack alignItems="flex-start" width="full" spacing="8px">
            <Text fontWeight={700} color="neutral.800">
              Select a Schedule to see the details
            </Text>
            <Schedule plan={data} />
          </VStack>

          <Flex width="full" justifyContent="flex-end">
            <Button
              customStyles={{ width: '161px' }}
              href={`/maintenance/plans/add?template=${data.templateId}`}
            >
              Use Template
            </Button>
          </Flex>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Details;
