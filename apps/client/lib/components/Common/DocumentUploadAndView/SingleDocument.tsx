import { Flex, HStack, Icon, Text } from '@chakra-ui/react';

import { CircularCloseIcon } from '~/lib/components/CustomIcons';
import { Document } from '~/lib/interfaces/general.interfaces';
import { FILE_ICONS } from '~/lib/utils/constants';
import { getDocumentInfo } from '~/lib/utils/helperFunctions';

interface SingleDocumentProps {
  document: Document;
  variant?: 'primary' | 'secondary';
  // eslint-disable-next-line no-unused-vars
  handleRemoveDocument: (document: Document) => void;
}

const SingleDocument = (props: SingleDocumentProps) => {
  const { document, variant = 'primary', handleRemoveDocument } = props;

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
          <Icon
            as={FILE_ICONS[(extensionName.toLowerCase() as 'pdf') ?? 'invalid']}
            boxSize="34px"
          />
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
