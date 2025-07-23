import { Stack, useMediaQuery, VStack } from '@chakra-ui/react';
import Detail from '~/lib/components/UI/ContentDetails/Detail';

import { useAppSelector } from '~/lib/redux/hooks';

const AdditionalMetaData = () => {
  const logData = useAppSelector((state) => state.auditLog.auditLog);
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  if (!logData) {
    return null;
  }

  const infoOne = [
    {
      label: 'Performed Via:',
      value: 'N/A',
    },
    {
      label: 'Vendor Contracts:',
      value: 'N/A',
    },
  ];
  const infoTwo = [
    {
      label: 'Associated Request ID:',
      value: 'N/A',
    },
    {
      label: 'User Assignments:',
      value: 'N/A',
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
          <Detail
            {...item}
            key={item.label}
            labelMinWidth={isMobile ? '146px' : '114px'}
          />
        ))}
      </VStack>
      <VStack alignItems="flex-start" spacing="16px">
        {infoTwo.map((item) => (
          <Detail {...item} key={item.label} labelMinWidth="146px" />
        ))}
      </VStack>
    </Stack>
  );
};

export default AdditionalMetaData;
