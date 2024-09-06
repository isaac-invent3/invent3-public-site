import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import Button from '~/lib/components/UI/Button';

const DocumentsTab = () => {
  return (
    <Flex
      width="full"
      alignItems="flex-end"
      gap="23px"
      direction="column"
      my="23px"
    >
      <Button
        customStyles={{ width: 'min-content', minH: '28px' }}
        variant="secondary"
      >
        Upload Documents
      </Button>
      <HStack width="full" spacing="24px" wrap="wrap">
        {['Purchase Receipt', 'Warranty Note'].map((item) => (
          <VStack spacing="11px" px="5px" key={item} width="67px">
            <Flex position="relative" width="58px" height="58px">
              <Image src="/pdf.png" fill alt="Pdf image" />
            </Flex>
            <Text
              fontSize="14px"
              fontWeight={500}
              lineHeight="16.63px"
              color="neutral.600"
              textAlign="center"
            >
              {item}
            </Text>
          </VStack>
        ))}
      </HStack>
    </Flex>
  );
};

export default DocumentsTab;
