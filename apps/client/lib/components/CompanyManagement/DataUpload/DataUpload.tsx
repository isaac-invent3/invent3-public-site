import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  Icon,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Button, FormInputWrapper, SlideTransition } from '@repo/ui/components';
import { DATA_UPLOAD_STATUS, FILE_ICONS } from '~/lib/utils/constants';
import DetailHeader from '../../UI/DetailHeader';
import InfoCard from '../../UI/InfoCard';
import UploadStatusTable from './UploadStatusTable';
import DocumentUploadAndView from '../../Common/DocumentUploadAndView';
import { useEffect, useState } from 'react';
import {
  DataUploadStageHistory,
  Document,
} from '~/lib/interfaces/general.interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  useGetMostRecentUploadQuery,
  useUploadDataMutation,
} from '~/lib/redux/services/utility.services';
import { getSession } from 'next-auth/react';
import { CloseIcon } from '../../CustomIcons';
import ValidationOneErrorModal from './ValidationOneErrorModal';
import ValidationTwoError from './ValidationTwoError.tsx';
import useSignalR from '~/lib/hooks/useSignalR';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import { dateFormatter } from '~/lib/utils/Formatters';

const DataUpload = () => {
  const headers = ['Stage', 'Status', 'Actions'];
  const [document, setDocumet] = useState<Document | null>(null);
  const {
    isOpen: isOpenError,
    onOpen: onOpenError,
    onClose: onCloseError,
  } = useDisclosure();
  const [showPhase2Error, setShowPhase2Error] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { handleSubmit } = useCustomMutation();
  const [uploadData, { isLoading, isSuccess, isError }] =
    useUploadDataMutation();
  const { data: recentUpload } = useGetMostRecentUploadQuery({});
  const [uploadStatus, setUploadStatus] = useState<number | null>(null);

  useEffect(() => {
    if (recentUpload?.data) {
      setUploadStatus(recentUpload?.data?.stageStatusId);
    }
  }, [recentUpload?.data]);

  const data = [
    [
      'Uploading Template',
      <Box>
        <HStack
          display={uploadStatus || isSuccess || isError ? 'flex' : 'none'}
        >
          <CheckIcon color="#00A129" />
          <Text as="span" color="neutral.700">
            Completed
          </Text>
        </HStack>

        <Text display={isLoading ? 'flex' : 'none'} color="neutral.700">
          Uploading...
        </Text>
        <Text
          display={
            !isLoading && !isError && !isSuccess && !uploadStatus
              ? 'flex'
              : 'none'
          }
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
        {(isSuccess || uploadStatus) && (
          <HStack>
            <CheckIcon color="#00A129" />
            <Text as="span" color="neutral.700">
              Completed
            </Text>
          </HStack>
        )}
        {!isError && !isSuccess && !uploadStatus && (
          <Text color="neutral.700">Pending...</Text>
        )}

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
      <Box>
        {uploadStatus === DATA_UPLOAD_STATUS.Completed && (
          <HStack>
            <CheckIcon color="#00A129" />
            <Text as="span" color="neutral.700">
              Completed
            </Text>
          </HStack>
        )}
        <Text color="neutral.700">
          {(isSuccess || uploadStatus === DATA_UPLOAD_STATUS.InProgress) &&
            'Validating...'}
          {uploadStatus == null && 'Pending...'}
        </Text>
        {uploadStatus &&
          [DATA_UPLOAD_STATUS.Done, DATA_UPLOAD_STATUS.Failed].includes(
            uploadStatus
          ) && (
            <HStack display="flex">
              <CloseIcon boxSize="16px" color="error.500" />
              <Text as="span" color="neutral.700">
                Failed
              </Text>
            </HStack>
          )}
      </Box>,
      uploadStatus &&
      [DATA_UPLOAD_STATUS.Done, DATA_UPLOAD_STATUS.Failed].includes(
        uploadStatus
      ) ? (
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
    [
      'Loading Data',
      uploadStatus ? (
        <Box>
          {uploadStatus === DATA_UPLOAD_STATUS.Completed && (
            <HStack>
              <CheckIcon color="#00A129" />
              <Text as="span" color="neutral.700">
                Completed
              </Text>
            </HStack>
          )}
          {uploadStatus &&
            [DATA_UPLOAD_STATUS.Done, DATA_UPLOAD_STATUS.Failed].includes(
              uploadStatus
            ) && (
              <HStack display="flex">
                <CloseIcon boxSize="16px" color="error.500" />
                <Text as="span" color="neutral.700">
                  Failed
                </Text>
              </HStack>
            )}
          {uploadStatus === DATA_UPLOAD_STATUS.InProgress && (
            <Text color="neutral.700">Uploading...</Text>
          )}
        </Box>
      ) : (
        <Text color="neutral.700">Pending...</Text>
      ),
      'N/A',
    ],
  ];

  const handleSubmitDocument = async () => {
    setUploadStatus(null);
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
      'Upload Set Successfully!. You will be notified as soon as the data is successfully added to the system',
      () => {},
      false
    );
    if (
      response?.error &&
      'data' in response.error &&
      (response.error as any)?.data?.data?.Assets
    ) {
      setValidationErrors((response.error as any)?.data?.data?.Assets);
    }
  };

  // SignalR Connection
  const connectionState = useSignalR('dataUploadHistory-hub');

  useSignalREventHandler({
    eventName: 'UpdateDataUploadHistory',
    connectionState,
    callback: (uploadUpdate) => {
      const parsedUploadData: DataUploadStageHistory = JSON.parse(uploadUpdate);
      if (parsedUploadData?.stageStatusId) {
        setUploadStatus(parsedUploadData?.stageStatusId);
      }
    },
  });

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

                <VStack width="full" alignItems="flex-start">
                  {recentUpload && uploadStatus && (
                    <Text size="md">
                      <Text fontWeight={700} size="md" as="span">
                        Most Recent Upload Status:{' '}
                      </Text>
                      {dateFormatter(
                        recentUpload?.data?.dateCreated,
                        'DD MMMM, YYYY'
                      )}
                    </Text>
                  )}
                  <UploadStatusTable headers={headers} data={data} />
                </VStack>
                <SlideTransition
                  trigger={showPhase2Error}
                  style={{ marginTop: '30px' }}
                >
                  <ValidationTwoError
                    dataUploadId={recentUpload?.data?.dataUploadId}
                  />
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
