import { Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { useField } from 'formik';
import Image from 'next/image';
import React from 'react';
import { CircularCloseIcon } from '~/lib/components/CustomIcons';

interface SingleDocumentProps {
  document: File;
}

const SingleDocument = (props: SingleDocumentProps) => {
  const { document } = props;
  const [field, meta, helpers] = useField('documents'); //eslint-disable-line

  const handleRemoveDocument = (document: any) => {
    const newValue = meta.value.filter(
      (old: { name: string }) => old !== document
    );
    helpers.setValue(newValue);
  };

  return (
    <HStack
      width="full"
      py="16px"
      pl="16px"
      pr="8px"
      borderBottomWidth="1px"
      borderColor="neutral.300"
      justifyContent="space-between"
    >
      <HStack spacing="64px">
        <HStack spacing="16px">
          <Flex position="relative" height="34px" width="34px">
            <Image src="/pdf.png" fill alt="Document type image" />
          </Flex>
          <Text
            size="lg"
            color="neutral.800"
            maxW="150px"
            // overflow="hidden"
            // textOverflow="ellipsis"
            // whiteSpace="nowrap"
          >
            {document.name}
          </Text>
        </HStack>
        <Text
          py="7px"
          px="12px"
          bgColor="neutral.100"
          color="neutral.800"
          textTransform="uppercase"
          rounded="8px"
        >
          {document?.type.split('/')?.[1]}
        </Text>
        <Text size="md" fontWeight={700}>
          {(document.size / 1000000).toFixed(2)}MB
        </Text>
      </HStack>
      <Icon
        as={CircularCloseIcon}
        color="#FF3B30"
        boxSize="18px"
        cursor="pointer"
        onClick={() => handleRemoveDocument(document)}
      />
    </HStack>
  );
};

export default SingleDocument;
