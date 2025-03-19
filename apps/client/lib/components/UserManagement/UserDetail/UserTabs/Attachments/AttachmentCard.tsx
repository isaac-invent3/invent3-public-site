import { Flex, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { UserDocument } from '~/lib/interfaces/user.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';

interface AttachmentCardProps {
  data: UserDocument;
}
const AttachmentCard = (props: AttachmentCardProps) => {
  const { data } = props;
  const downloadDocument = () => {
    if (data.document) {
      const link = document.createElement('a');
      link.href = `${data.base64Prefix}${data.document}`;
      link.download = data.documentName;
      link.click();
    }
  };
  return (
    <VStack
      width={{ base: 'full', sm: '182px' }}
      spacing={0}
      cursor="pointer"
      onClick={downloadDocument}
    >
      <Flex height="114px" width="full" bgColor="neutral.100" />
      <VStack
        width="full"
        spacing="4px"
        alignItems="flex-start"
        pt="8px"
        pb="13px"
        px="9px"
        border="1px solid #E6E6E6"
      >
        <Text color="primary.500" fontWeight={700} size="md">
          {data?.documentName}
        </Text>
        <Text color="neutral.600" size="xs">
          Created {dateFormatter(data?.createdDate, 'MMMM DD, YYYY')}
        </Text>
      </VStack>
    </VStack>
  );
};

export default AttachmentCard;
