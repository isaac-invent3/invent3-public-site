import { CheckIcon } from '@chakra-ui/icons';
import { HStack, Icon, Progress, Stack, Text, VStack } from '@chakra-ui/react';
import { Button, FileUpload, FormInputWrapper } from '@repo/ui/components';
import { FILE_ICONS } from '~/lib/utils/constants';
import DetailHeader from '../../UI/DetailHeader';
import InfoCard from '../../UI/InfoCard';
import UploadStatusTable from './UploadStatusTable';
import DocumentUploadAndView from '../../Common/DocumentUploadAndView';
import { useState } from 'react';
import { Document } from '~/lib/interfaces/general.interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useUploadDataMutation } from '~/lib/redux/services/utility.services';
import { getSession } from 'next-auth/react';

// interface DataUploadProps {
//   handleSubmitData: (document: Document) => void;
// }

const DataUpload = () => {
  const headers = ['Stage', 'Status', 'Download'];
  const [document, setDocumet] = useState<Document | null>(null);
  const { handleSubmit } = useCustomMutation();
  const [uploadData, { isLoading }] = useUploadDataMutation();
  const data = [
    [
      'Uploading template',
      // For instance, you could even pass in a custom component:
      <HStack>
        <CheckIcon color="#00A129" />
        <Text as="span" color="#656565">
          Completed
        </Text>
      </HStack>,
      <Text
        as="span"
        color="#0366EF"
        textDecoration="underline"
        cursor="pointer"
      >
        Upload Report
      </Text>,
    ],
    [
      'Extracting data',
      <HStack>
        <Text>
          Uploading{' '}
          <Text as="span" color="#C24100" fontWeight={500}>
            (60%)
          </Text>
        </Text>
        <Progress
          value={60}
          size="sm"
          colorScheme="orange"
          width="100px"
          borderRadius="md"
        />
      </HStack>,
      '',
    ],
    ['Transforming data', 'Pending', ''],
    ['Loading data', 'Pending', ''],
  ];

  const handleSubmitDocument = async () => {
    const session = await getSession();
    if (!document) return;

    // Extract base64 string (remove prefix if present)
    const base64String =
      document.base64Document?.split(',')[1] || document.base64Document;
    if (!base64String) return;

    // Convert base64 to binary
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Create a Blob and File object
    const file = new File([byteArray], document.documentName || 'upload.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Prepare FormData
    const formData = new FormData();
    formData.append('ExcelFile', file);
    formData.append('UploadedBy', session?.user?.username!);

    // Call upload mutation
    const response = await handleSubmit(
      uploadData,
      formData,
      'Upload Set Successfully!. You will be notified as soon as the data is successfully added to the sytem'
    );
  };

  return (
    <VStack width="full" alignItems="flex-end">
      <VStack width="full" alignItems="flex-start">
        <DetailHeader variant="primary" customStyles={{ size: 'lg' }}>
          1. Download Template
        </DetailHeader>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justifyContent="space-between"
          w={{ md: '70%' }}
          spacing={'16px'}
        >
          <FormInputWrapper
            sectionMaxWidth="157px"
            customSpacing="64px"
            description="Provide the company’s registration number"
            title="Download Template"
            isRequired
          >
            <HStack spacing="11px">
              <Icon as={FILE_ICONS['pdf']} boxSize="34px" />
              <Text
                size="md"
                fontWeight={700}
                color="#0366EF"
                cursor="pointer"
                as="a"
                href="https://docs.google.com/spreadsheets/d/1jhVhtzHymsgJ5vktYpzWvMLVdcSgQJI5NzmD3b6oX4c/export?format=xlsx"
              >
                Click to Download Template{' '}
              </Text>
            </HStack>
          </FormInputWrapper>

          <InfoCard
            customStyle={{ maxW: '370px' }}
            infoText="The template document has different tabs that caters to the different data to be uploaded"
          />
        </Stack>
      </VStack>
      <VStack width="full">
        <DetailHeader
          variant="primary"
          customStyles={{ size: 'lg', mt: { base: '16px', lg: '72px' } }}
        >
          2. Upload Data Document
        </DetailHeader>{' '}
        <FormInputWrapper
          sectionMaxWidth="157px"
          customSpacing="64px"
          description="Easily upload your data files"
          title="Upload File (CSV, Excel)"
          isRequired={false}
        >
          <VStack w="full" maxW="700px">
            <DocumentUploadAndView
              handleAddDocuments={(document) => {
                if (document?.[0]) {
                  setDocumet(document?.[0]);
                }
              }}
              documents={document ? [document] : []}
              handleRemoveDocuments={(document) => setDocumet(null)}
              acceptableText="XLS, XLSX are supported"
              acceptableFormat=".xls, .xlsx"
              validTypes={[
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              ]}
            />

            {/* <UploadStatusTable
            headers={headers}
            data={data}
            containerProps={{ mt: 8 }}
          /> */}
          </VStack>
        </FormInputWrapper>
      </VStack>
      <Button
        customStyles={{ width: 'max-content' }}
        isDisabled={document === null}
        handleClick={handleSubmitDocument}
        isLoading={isLoading}
      >
        Save Changes
      </Button>
    </VStack>
  );
};

export default DataUpload;
