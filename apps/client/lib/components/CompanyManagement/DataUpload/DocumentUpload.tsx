import { Stack, VStack } from '@chakra-ui/react';
import { FormInputWrapper } from '@repo/ui/components';
import InfoCard from '../../UI/InfoCard';
import DocumentUploadAndView from '../../Common/DocumentUploadAndView';
import { useEffect, useState } from 'react';
import { Document } from '~/lib/interfaces/general.interfaces';
import SingleDocument from '../../Common/DocumentUploadAndView/SingleDocument';

const DocumentUpload = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const handleRemoveDocument = (document: Document) => {
    const updatedDocuments: Document[] = documents.filter(
      (old: Document) => old !== document
    );
    setDocuments(updatedDocuments);
  };

  useEffect(() => {
    console.log({ documents });
  }, [document]);
  return (
    <FormInputWrapper
      sectionMaxWidth="157px"
      customSpacing="104px"
      description="Easily upload your data files"
      title="Upload Document"
      isRequired={false}
    >
      <VStack spacing={{ base: '24px' }} alignItems="flex-start" width="full">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          alignItems="flex-start"
          spacing="16px"
          width="full"
        >
          <DocumentUploadAndView
            variant="secondary"
            handleRemoveDocuments={(document) => handleRemoveDocument(document)}
            handleAddDocuments={(documents) => {
              setDocuments(documents);
            }}
            documents={documents}
            error={undefined}
            showDocumentView={false}
          />
          <InfoCard
            customStyle={{ maxW: '301px', height: 'fit-content' }}
            infoText="The zipped documents, each should be named to correspond to the contents in the template document under the image file name column"
          />
        </Stack>
        <VStack width="full" spacing="4px">
          {documents.map((item: Document, index: number) => (
            <SingleDocument
              document={item}
              variant="primary"
              key={index}
              handleRemoveDocument={(document) =>
                handleRemoveDocument(document)
              }
            />
          ))}
        </VStack>
      </VStack>
    </FormInputWrapper>
  );
};

export default DocumentUpload;
