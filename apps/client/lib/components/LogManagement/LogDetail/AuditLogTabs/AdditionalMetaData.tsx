import { HStack, VStack } from '@chakra-ui/react';
import Detail from '~/lib/components/UI/ContentDetails/Detail';

import { useAppSelector } from '~/lib/redux/hooks';

const AdditionalMetaData = () => {
  const logData = useAppSelector((state) => state.auditLog.auditLog);

  if (!logData) {
    return null;
  }

  const infoOne = [
    {
      label: 'Performed Via:',
      value: 'Web Application',
    },
    {
      label: 'Vendor Contracts:',
      value: 'Contract ID: C-20240120. 01/02/2026',
    },
  ];
  const infoTwo = [
    {
      label: 'Associated Request ID:',
      value: 'REQ-20240625-XYZ78',
    },
    {
      label: 'User Assignments:',
      value: 'Vendor Contact Changed from Alice Brown to Michael Johnson',
    },
  ];

  return (
    <HStack
      width="full"
      p="16px"
      borderWidth="0.7px"
      borderColor="#BBBBBBB2"
      rounded="8px"
      spacing="64px"
      alignItems="flex-start"
    >
      <VStack alignItems="flex-start" spacing="16px">
        {infoOne.map((item) => (
          <Detail {...item} key={item.label} labelMinWidth="114px" />
        ))}
      </VStack>
      <VStack alignItems="flex-start" spacing="16px">
        {infoTwo.map((item) => (
          <Detail {...item} key={item.label} labelMinWidth="146px" />
        ))}
      </VStack>
    </HStack>
  );
};

export default AdditionalMetaData;
