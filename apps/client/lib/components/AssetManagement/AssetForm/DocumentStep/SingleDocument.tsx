import { Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';
import { CircularCloseIcon } from '~/lib/components/CustomIcons';
import { AssetFormDocument } from '~/lib/interfaces/asset.interfaces';
import { FILE_ICONS } from '~/lib/utils/constants';
import { getDocumentInfo } from '~/lib/utils/helperFunctions';

interface SingleDocumentProps {
  document: AssetFormDocument;
}

const SingleDocument = (props: SingleDocumentProps) => {
  const { document } = props;
  const [field, meta, helpers] = useField('documents'); //eslint-disable-line

  const handleRemoveDocument = (document: any) => {
    const newValue = meta.value.filter(
      (old: { documentName: string }) => old !== document
    );
    helpers.setValue(newValue);
  };
  const { extensionName, sizeInMB } = getDocumentInfo(document);

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
          <Icon as={FILE_ICONS[extensionName ?? 'invalid']} boxSize="34px" />
          <Text size="lg" color="neutral.800" width="150px">
            {document.documentName}
          </Text>
        </HStack>
        <Flex width="70px">
          <Text
            py="7px"
            px="12px"
            bgColor="neutral.100"
            color="neutral.800"
            textTransform="uppercase"
            rounded="8px"
          >
            {extensionName}
          </Text>
        </Flex>
        <Text size="md" fontWeight={700}>
          {sizeInMB.toFixed(2)}MB
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
