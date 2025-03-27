import { Flex, Text, VStack } from '@chakra-ui/react';

import DetailHeader from '~/lib/components/UI/DetailHeader';
import { MaintenanceScheduleInstance } from '~/lib/interfaces/maintenance.interfaces';

interface OtherInfoProps {
  data: MaintenanceScheduleInstance;
}
const OtherInfo = (props: OtherInfoProps) => {
  const { data } = props;
  const engineersContact = [
    data?.contactPerson,
    data?.contactPersonPhoneNo,
    data?.contactPersonEmail,
  ];
  return (
    <Flex gap="40px" width="full" alignItems="flex-start" direction="column">
      <Flex
        gap="40px"
        width="full"
        alignItems="flex-start"
        direction={{ base: 'column', md: 'row' }}
      >
        <VStack width={{ base: 'full' }} alignItems="flex-start" spacing="4px">
          <DetailHeader variant="secondary" customStyles={{ color: 'black' }}>
            Description
          </DetailHeader>
          <Text color="neutral.600" size="md">
            {data?.comments ? data?.comments : 'N/A'}
          </Text>
        </VStack>
        <VStack width={{ base: 'full' }} alignItems="flex-start" spacing="4px">
          <DetailHeader
            variant="secondary"
            customStyles={{ color: 'black', whiteSpace: 'nowrap' }}
          >
            Engineer/Contact Person
          </DetailHeader>
          <VStack width="full" alignItems="flex-start" spacing="4px">
            {engineersContact.filter(Boolean).length > 0 ? (
              engineersContact.map((item, index) => (
                <Text color="neutral.600" key={index} size="md">
                  {item}
                </Text>
              ))
            ) : (
              <Text color="neutral.600">N/A</Text>
            )}
          </VStack>
        </VStack>
      </Flex>
      <VStack width={{ base: 'full' }} alignItems="flex-start" spacing="4px">
        <DetailHeader variant="secondary" customStyles={{ color: 'black' }}>
          Asset Location
        </DetailHeader>
        <Text color="neutral.600" size="md">
          {data?.assetLocation ?? 'N/A'}
        </Text>
      </VStack>
    </Flex>
  );
};

export default OtherInfo;
