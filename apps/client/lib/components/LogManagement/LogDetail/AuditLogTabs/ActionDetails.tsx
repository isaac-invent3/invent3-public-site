import { Stack, useMediaQuery, VStack } from '@chakra-ui/react';
import Detail from '~/lib/components/UI/ContentDetails/Detail';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';

import { useAppSelector } from '~/lib/redux/hooks';

const ActionDetails = () => {
  const logData = useAppSelector((state) => state.auditLog.auditLog);
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  if (!logData) {
    return null;
  }

  const infoOne = [
    {
      label: 'Action Type:',
      value: 'Updated Vendor Details',
    },
    {
      label: 'Module Affected:',
      value: 'Vendor Management',
    },
  ];

  return (
    <Stack
      width="full"
      p="16px"
      borderWidth="0.7px"
      borderColor="#BBBBBBB2"
      rounded="8px"
      spacing={{ base: '16px', md: '64px' }}
      alignItems="flex-start"
      direction={{ base: 'column', md: 'row' }}
    >
      <VStack alignItems="flex-start" spacing="16px">
        {infoOne.map((item) => (
          <Detail {...item} key={item.label} labelMinWidth="108px" />
        ))}
      </VStack>
      <VStack alignItems="flex-start" spacing="16px">
        <Detail
          label="Entity Affected:"
          value="Tech Supplies Ltd"
          labelMinWidth={isMobile ? '108px' : '97px'}
        />
        <Detail
          label="Action Status:"
          value=""
          labelMinWidth={isMobile ? '108px' : '97px'}
          itemContainerStyle={{ alignItems: 'center' }}
        >
          <GenericStatusBox text="Success" colorCode="#018A1E" />
        </Detail>
      </VStack>
    </Stack>
  );
};

export default ActionDetails;
