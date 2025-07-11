import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  Icon,
  Progress,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {
  Button,
  FileUpload,
  FormInputWrapper,
  SlideTransition,
} from '@repo/ui/components';
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
import { CloseIcon } from '../../CustomIcons';
import ValidationOneErrorModal from './ValidationOneErrorModal';
import ValidationTwoError from './ValidationTwoError.tsx';

const DataUpload = () => {
  const headers = ['Stage', 'Status', 'Actions'];
  const [document, setDocumet] = useState<Document | null>(null);
  const {
    isOpen: isOpenError,
    onOpen: onOpenError,
    onClose: onCloseError,
  } = useDisclosure();
  const [showPhase2Error, setShowPhase2Error] = useState(false);
  const [hasPhase2Error, setHasPhase2Error] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { handleSubmit } = useCustomMutation();
  const [uploadData, { isLoading, isSuccess, isError }] =
    useUploadDataMutation();
  const data = [
    [
      'Uploading Template',
      // For instance, you could even pass in a custom component:
      <Box>
        <HStack display={isSuccess || isError ? 'flex' : 'none'}>
          <CheckIcon color="#00A129" />
          <Text as="span" color="neutral.700">
            Completed
          </Text>
        </HStack>

        <Text display={isLoading ? 'flex' : 'none'} color="neutral.700">
          Uploading...
        </Text>
        <Text
          display={!isLoading && !isError && !isSuccess ? 'flex' : 'none'}
          color="neutral.700"
        >
          Pending...
        </Text>
      </Box>,
      <>N/A</>,
    ],
    [
      'Validating Template Phase 1',
      <Box>
        {isSuccess && (
          <HStack>
            <CheckIcon color="#00A129" />
            <Text as="span" color="neutral.700">
              Completed
            </Text>
          </HStack>
        )}
        {!isError && !isSuccess && <Text color="neutral.700">Pending...</Text>}

        <HStack display={isError ? 'flex' : 'none'}>
          <CloseIcon boxSize="16px" color="error.500" />
          <Text as="span" color="neutral.700">
            Failed ({validationErrors?.length} Error(s))
          </Text>
        </HStack>
      </Box>,
      isError ? (
        <Text
          as="span"
          color="#0366EF"
          textDecoration="underline"
          cursor="pointer"
          onClick={onOpenError}
        >
          View Errors
        </Text>
      ) : (
        <>N/A</>
      ),
      ,
    ],
    [
      'Validating Template Phase 2',
      <Text color="neutral.700">
        {isSuccess ? 'Validating...' : 'Pending...'}
      </Text>,
      hasPhase2Error ? (
        <Text
          as="span"
          color="#0366EF"
          textDecoration="underline"
          cursor="pointer"
          onClick={() => setShowPhase2Error(true)}
        >
          View Errors
        </Text>
      ) : (
        <>N/A</>
      ),
    ],
    ['Loading Data', <Text color="neutral.700">Pending...</Text>, 'N/A'],
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
      'Upload Set Successfully!. You will be notified as soon as the data is successfully added to the sytem',
      () => {},
      false
    );
    if (
      response?.error &&
      'data' in response.error &&
      (response.error as any)?.data?.data?.Assets
    ) {
      console.log(response);
      setValidationErrors((response.error as any)?.data?.data?.Assets);
    }
  };

  return (
    <>
      <VStack width="full" alignItems="flex-end" spacing="16px">
        <VStack
          width="full"
          alignItems="flex-start"
          bgColor="white"
          pt={{ base: '24px' }}
          px="16px"
          pb={{ base: '16px', lg: '40px' }}
          rounded="6px"
          minH="60vh"
        >
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

                <UploadStatusTable headers={headers} data={data} />
                <SlideTransition
                  trigger={showPhase2Error}
                  style={{ marginTop: '30px' }}
                >
                  <ValidationTwoError />
                </SlideTransition>
              </VStack>
            </FormInputWrapper>
          </VStack>
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
      <ValidationOneErrorModal
        isOpen={isOpenError}
        onClose={onCloseError}
        missingColumns={validationErrors}
      />
    </>
  );
};

export default DataUpload;
