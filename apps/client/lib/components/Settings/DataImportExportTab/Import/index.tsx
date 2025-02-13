import { Text, useMediaQuery, VStack } from '@chakra-ui/react';
import { Select } from '@repo/ui/components';
import React from 'react';
import DocumentUploadAndView from '~/lib/components/Common/DocumentUploadAndView';
import SectionWrapper from '~/lib/components/Profile/Common/SectionWrapper';

const Import = () => {
  const [isMobile] = useMediaQuery('(max-width: 480px)');
  return (
    <VStack spacing="24px" width="full" alignItems="flex-start">
      <Text fontWeight={700} size="lg">
        Import
      </Text>
      <SectionWrapper
        title="Upload File (CSV, Excel)"
        subtitle="Easily upload your data files"
        spacing={{ base: '8px', sm: '24px' }}
        sectionInfoWidth="157px"
        direction={{ base: 'column', lg: 'row' }}
        sectionInfoStyle={{ maxW: { base: '100%', lg: '157px' } }}
      >
        <DocumentUploadAndView
          documents={[]}
          handleAddDocuments={() => {}}
          handleRemoveDocuments={() => {}}
        />
      </SectionWrapper>
      <SectionWrapper
        title="Data Mapping Configuration"
        subtitle="Match fields for accurate import."
        spacing={{ base: '8px', sm: '24px' }}
        direction={{ base: 'column', sm: 'row' }}
        sectionInfoStyle={{ maxW: { base: '100%' } }}
      >
        <Select
          title="Mapping"
          options={[]}
          selectedOption={undefined}
          containerStyles={{
            width: isMobile ? '100%' : '179px',
          }}
          selectStyles={{ height: '46px', pt: '0px' }}
          showTitleAfterSelect={false}
          handleSelect={() => {}}
        />
      </SectionWrapper>
    </VStack>
  );
};

export default Import;
