import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';

const Documents = ({ documents }: { documents: (string | File)[] }) => {
  return (
    <VStack spacing="8px" width="full" alignItems="flex-start">
      <DetailHeader variant="primary">Asset Images</DetailHeader>
      <VStack width="full" alignItems="flex-start" spacing="12px">
        {documents.map((document, index) => (
          <HStack spacing="16px" width="full">
            <Flex position="relative" width="34px" height="34px" key={index}>
              <Image src="/pdf.png" alt="asset image" fill />
            </Flex>
            <Text color="neutral.800">
              {typeof document === 'string' ? document : document.name}
            </Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};

export default Documents;
