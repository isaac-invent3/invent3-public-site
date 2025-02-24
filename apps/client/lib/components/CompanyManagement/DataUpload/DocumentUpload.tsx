import { HStack } from '@chakra-ui/react';
import { FileUpload, FormInputWrapper } from '@repo/ui/components';
import InfoCard from '../../UI/InfoCard';

const DocumentUpload = () => {
  return (
    <>
      <HStack w="full" justify="space-between">
        <FormInputWrapper
          sectionMaxWidth="157px"
          customSpacing="64px"
          description="Easily upload your data files"
          title="Upload File (CSV, Excel)"
          isRequired={false}
        >
          <FileUpload />
        </FormInputWrapper>
        <InfoCard
          customStyle={{ maxW: '370px' }}
          infoText="The template document has different tabs that caters to the different data to be uploaded"
        />
      </HStack>
    </>
  );
};

export default DocumentUpload;
