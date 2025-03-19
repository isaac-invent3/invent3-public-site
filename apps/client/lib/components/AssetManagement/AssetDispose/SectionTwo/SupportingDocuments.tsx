import { VStack } from '@chakra-ui/react';

import DetailHeader from '~/lib/components/UI/DetailHeader';
import AddDocument from '../../AssetForm/DocumentStep/AddDocument';

const SupportingDocuments = () => {
  return (
    <VStack spacing="16px" alignItems="flex-start" width="full">
      <DetailHeader
        variant="secondary"
        customStyles={{ size: { base: 'md', md: 'lg' }, fontWeight: 700 }}
      >
        Supporting Documents
      </DetailHeader>
      <AddDocument variant="secondary" />
    </VStack>
  );
};

export default SupportingDocuments;
