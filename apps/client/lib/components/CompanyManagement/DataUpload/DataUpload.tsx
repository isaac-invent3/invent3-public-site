import { CheckIcon } from '@chakra-ui/icons';
import { HStack, Icon, Progress, Stack, Text, VStack } from '@chakra-ui/react';
import { FileUpload, FormInputWrapper } from '@repo/ui/components';
import { FILE_ICONS } from '~/lib/utils/constants';
import DetailHeader from '../../UI/DetailHeader';
import InfoCard from '../../UI/InfoCard';
import UploadStatusTable from './UploadStatusTable';
import DocumentUploadAndView from '../../Common/DocumentUploadAndView';
import { useState } from 'react';
import { Document } from '~/lib/interfaces/general.interfaces';

const DataUpload = () => {
  const headers = ['Stage', 'Status', 'Download'];
  const [document, setDocumet] = useState<Document | null>(null);
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
  return (
    <>
      <DetailHeader variant="primary" customStyles={{ size: 'lg' }}>
        1. Download Template
      </DetailHeader>
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        justifyContent="space-between"
        w={{ md: '70%' }}
        spacing="16px"
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
      <DetailHeader variant="primary" customStyles={{ size: 'lg' }}>
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
          />

          <UploadStatusTable
            headers={headers}
            data={data}
            containerProps={{ mt: 8 }}
          />
        </VStack>
      </FormInputWrapper>
    </>
  );
};

export default DataUpload;
