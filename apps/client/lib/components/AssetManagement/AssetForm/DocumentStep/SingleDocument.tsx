import { Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { useField } from 'formik';

import { CircularCloseIcon } from '~/lib/components/CustomIcons';
import { AssetFormDocument } from '~/lib/interfaces/asset.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { FILE_ICONS } from '~/lib/utils/constants';
import { getDocumentInfo } from '~/lib/utils/helperFunctions';

interface SingleDocumentProps {
  document: AssetFormDocument;
  variant?: 'primary' | 'secondary';
}

const SingleDocument = (props: SingleDocumentProps) => {
  const { document, variant = 'primary' } = props;
  const [field, meta, helpers] = useField('documents'); //eslint-disable-line
  const dispatch = useAppDispatch();
  const { existingDocumentsIds, deletedExistingDocumentIds } = useAppSelector(
    (state) => state.asset.assetForm
  );

  const handleRemoveDocument = (document: AssetFormDocument) => {
    const updatedDocuments: AssetFormDocument[] = meta.value.filter(
      (old: AssetFormDocument) => old !== document
    );
    helpers.setValue(updatedDocuments);

    const isInExistingDocumentArray = existingDocumentsIds.includes(
      document.documentId as number
    );

    const updatedDeletedDocuments = isInExistingDocumentArray
      ? deletedExistingDocumentIds
      : [...deletedExistingDocumentIds, document.documentId as number];

    // Dispatch the updated state
    dispatch(
      updateAssetForm({
        existingDocumentsIds: existingDocumentsIds.filter(
          (item) => item != (document.documentId as number)
        ),
        deletedExistingDocumentIds: updatedDeletedDocuments,
      })
    );
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
      spacing="16px"
    >
      <HStack spacing={variant === 'primary' ? '64px' : '0px'} flexWrap="wrap">
        <HStack spacing="16px">
          <Icon as={FILE_ICONS[extensionName ?? 'invalid']} boxSize="34px" />
          <Text
            size="lg"
            color="neutral.800"
            width={variant === 'primary' ? '150px' : 'full'}
          >
            {document?.documentName}
          </Text>
        </HStack>
        {variant === 'primary' && (
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
        )}
        {variant === 'primary' && (
          <Text size="md" fontWeight={700}>
            {sizeInMB?.toFixed(2)}MB
          </Text>
        )}
      </HStack>
      {variant === 'secondary' && (
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
      )}
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
