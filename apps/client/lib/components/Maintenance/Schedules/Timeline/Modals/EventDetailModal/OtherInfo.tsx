import { Flex, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';

interface OtherInfoProps {
  data: MaintenancePlan;
}
const OtherInfo = (props: OtherInfoProps) => {
  const { data } = props;
  return (
    <Flex gap="40px" width="full" alignItems="flex-start">
      <VStack width="43%" alignItems="flex-start" spacing="4px">
        <DetailHeader
          variant="secondary"
          customStyles={{ color: 'black', size: 'base', fontWeight: 500 }}
        >
          Description
        </DetailHeader>
        <Text color="neutral.600">{data?.comments}</Text>
      </VStack>
      <VStack width="30%" alignItems="flex-start" spacing="4px">
        <DetailHeader
          variant="secondary"
          customStyles={{ color: 'black', size: 'base', fontWeight: 500 }}
        >
          Asset Location
        </DetailHeader>
        <Text color="neutral.600">{data?.assetLocation}</Text>
      </VStack>
      <VStack width="27%" alignItems="flex-start" spacing="4px">
        <DetailHeader
          variant="secondary"
          customStyles={{ color: 'black', size: 'base', fontWeight: 500 }}
        >
          Engineer/Contact Person
        </DetailHeader>
        <VStack width="full" alignItems="flex-start" spacing="4px">
          {[
            data?.contactPerson,
            data?.contactPersonPhoneNo,
            data?.contactPersonEmail,
          ]
            .filter(Boolean)
            .map((item, index) => (
              <Text color="neutral.600" key={index}>
                {item}
              </Text>
            ))}
        </VStack>
      </VStack>
    </Flex>
  );
};

export default OtherInfo;
