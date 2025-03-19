import { Flex, Text, VStack } from '@chakra-ui/react';

import DetailHeader from '~/lib/components/UI/DetailHeader';
import { MaintenanceScheduleInstance } from '~/lib/interfaces/maintenance.interfaces';

interface OtherInfoProps {
  data: MaintenanceScheduleInstance;
}
const OtherInfo = (props: OtherInfoProps) => {
  const { data } = props;
  return (
    <Flex
      gap="40px"
      width="full"
      alignItems="flex-start"
      direction={{ base: 'column', md: 'row' }}
    >
      <VStack
        width={{ base: 'full', md: '43%' }}
        alignItems="flex-start"
        spacing="4px"
      >
        <DetailHeader
          variant="secondary"
          customStyles={{ color: 'black', size: 'base', fontWeight: 500 }}
        >
          Description
        </DetailHeader>
        <Text color="neutral.600">
          {data?.comments ? data?.comments : 'N/A'}
        </Text>
      </VStack>
      <VStack
        width={{ base: 'full', md: '30%' }}
        alignItems="flex-start"
        spacing="4px"
      >
        <DetailHeader
          variant="secondary"
          customStyles={{ color: 'black', size: 'base', fontWeight: 500 }}
        >
          Asset Location
        </DetailHeader>
        <Text color="neutral.600">{data?.assetLocation ?? 'N/A'}</Text>
      </VStack>
      <VStack
        width={{ base: 'full', md: '27%' }}
        alignItems="flex-start"
        spacing="4px"
      >
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
