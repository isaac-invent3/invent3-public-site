import { CheckIcon } from '@chakra-ui/icons';
import { HStack, Icon, Progress, Text, VStack } from '@chakra-ui/react';
import { FileUpload, FormInputWrapper } from '@repo/ui/components';
import { FILE_ICONS } from '~/lib/utils/constants';
import DetailHeader from '../../UI/DetailHeader';
import InfoCard from '../../UI/InfoCard';
import UploadStatusTable from './UploadStatusTable';

const DataUpload = () => {
  const headers = ['Stage', 'Status', 'Download'];
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
      <HStack justifyContent="space-between" w={{md:'70%'}}>
        <FormInputWrapper
          sectionMaxWidth="157px"
          customSpacing="64px"
          description="Provide the company’s registration number"
          title="Download Template"
          isRequired
        >
          <HStack spacing="11px">
            <Icon as={FILE_ICONS['pdf']} boxSize="34px" />
            <Text size="md" fontWeight={700} color="#0366EF" cursor="pointer">
              Click to Download Template{' '}
            </Text>
          </HStack>
        </FormInputWrapper>

        <InfoCard
          customStyle={{ maxW: '370px' }}
          infoText="The template document has different tabs that caters to the different data to be uploaded"
        />
      </HStack>
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
          <FileUpload />

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
