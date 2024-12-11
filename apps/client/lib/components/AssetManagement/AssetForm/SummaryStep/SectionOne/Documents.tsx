import { HStack, Icon, Text, VStack } from '@chakra-ui/react';

import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import { FILE_ICONS } from '~/lib/utils/constants';
import { getDocumentInfo } from '~/lib/utils/helperFunctions';

const Documents = () => {
  const { documents } = useAppSelector((state) => state.asset.assetForm);
  return (
    <VStack spacing="8px" width="full" alignItems="flex-start">
      <DetailHeader variant="primary">Documents</DetailHeader>
      <VStack width="full" alignItems="flex-start" spacing="12px">
        {documents.length >= 1 ? (
          documents.map((document, index) => {
            const { extensionName } = getDocumentInfo(document);
            return (
              <HStack spacing="16px" width="full" key={index}>
                <Icon
                  as={FILE_ICONS[extensionName ?? 'invalid']}
                  boxSize="34px"
                />
                <Text
                  color="neutral.800"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {document.documentName}
                </Text>
              </HStack>
            );
          })
        ) : (
          <Text
            fontStyle="italic"
            color="neutral.300"
            width="full"
            textAlign="center"
            my={4}
          >
            No Documents added
          </Text>
        )}
      </VStack>
    </VStack>
  );
};

export default Documents;
