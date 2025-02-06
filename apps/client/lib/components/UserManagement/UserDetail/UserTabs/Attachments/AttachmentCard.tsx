import { Flex, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { dateFormatter } from '~/lib/utils/Formatters';

interface AttachmentCardProps {
  title: string;
  date: string;
}
const AttachmentCard = (props: AttachmentCardProps) => {
  const { title, date } = props;
  return (
    <VStack width={{ base: 'full', sm: '182px' }} spacing={0}>
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
          {title}
        </Text>
        <Text color="neutral.600" size="xs">
          Created {dateFormatter(date, 'MMMM DD, YYYY')}
        </Text>
      </VStack>
    </VStack>
  );
};

export default AttachmentCard;
