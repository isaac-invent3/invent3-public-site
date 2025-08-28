import { Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { DeleteIcon } from '../../CustomIcons';
import { Document } from '~/lib/interfaces/general.interfaces';
import { downloadDocument, getDocumentInfo } from '~/lib/utils/helperFunctions';

interface ViewAttachementProps {
  attachement: Document;
  handleRemoveDocument: () => void;
  showDeleteIcon?: boolean;
}
const ViewAttachement = (props: ViewAttachementProps) => {
  const { attachement, handleRemoveDocument, showDeleteIcon } = props;
  const { extensionName, sizeInMB } = getDocumentInfo({
    base64Document: attachement.base64Document,
    documentName: attachement.documentName,
    base64Prefix: attachement.base64Prefix,
    documentId: attachement.documentId,
  });
  return (
    <HStack
      width="full"
      p="8px"
      pr="17px"
      rounded="6px"
      borderWidth="1px"
      borderColor="#C9C9C9"
      justifyContent="space-between"
    >
      <HStack spacing="12px" alignItems="flex-start">
        <Flex
          alignItems="center"
          justifyContent="center"
          rounded="4px"
          height="42px"
          width="42px"
          bgColor="#E7E7E7"
        >
          <Text color="black" textTransform="uppercase">
            {extensionName}
          </Text>
        </Flex>
        <VStack spacing="4px" alignItems="flex-start">
          <Text
            size="md"
            fontWeight={700}
            color="blue.500"
            lineHeight="100%"
            cursor="pointer"
            onClick={() => downloadDocument(attachement)}
          >
            {attachement.documentName}
          </Text>
          <Text fontWeight={400} color="neutral.600">
            {sizeInMB?.toFixed(2)}MB
          </Text>
        </VStack>
      </HStack>
      {showDeleteIcon && (
        <Icon
          as={DeleteIcon}
          boxSize="24px"
          color="error.500"
          onClick={handleRemoveDocument}
        />
      )}
    </HStack>
  );
};

export default ViewAttachement;
