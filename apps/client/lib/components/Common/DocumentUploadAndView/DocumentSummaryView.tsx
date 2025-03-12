import { HStack, Icon, Text, VStack } from '@chakra-ui/react';

import DetailHeader from '~/lib/components/UI/DetailHeader';
import { Document } from '~/lib/interfaces/general.interfaces';
import { FILE_ICONS } from '~/lib/utils/constants';
import { getDocumentInfo } from '~/lib/utils/helperFunctions';

interface DocumentSummaryViewProps {
  documents: Document[];
}
const DocumentSummaryView = ({ documents }: DocumentSummaryViewProps) => {
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

export default DocumentSummaryView;
