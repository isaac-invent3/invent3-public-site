/* eslint-disable no-unused-vars */
import {
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { DocumentIcon, InfoIcon } from '~/lib/components/CustomIcons';
import { Document, ValidFileType } from '~/lib/interfaces/general.interfaces';
import SingleDocument from './SingleDocument';
import _ from 'lodash';

interface DocumentUploadAndViewProps {
  variant?: 'primary' | 'secondary';
  handleAddDocuments: (document: Document[]) => void;
  handleRemoveDocuments: (document: Document) => void;
  handleOpenExistingDocumentModal?: () => void;
  documents: Document[];
  setError?: (error: string) => void;
  error?: string | undefined;
  showDocumentView?: boolean;
  validTypes?: ValidFileType[];
  acceptableText?: string;
  acceptableFormat?: string;
}

const DocumentUploadAndView = (props: DocumentUploadAndViewProps) => {
  const {
    variant,
    handleAddDocuments,
    handleRemoveDocuments,
    handleOpenExistingDocumentModal,
    documents,
    setError,
    error,
    showDocumentView = true,
    acceptableText,
    acceptableFormat,
    validTypes,
  } = props;
  const [isDragging, setIsDragging] = useState(false);

  // Updated valid file types for txt, word, excel, powerpoint, pdf, and images (jpeg)

  const validFileTypes: ValidFileType[] = validTypes ?? [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'image/jpeg',
  ];

  const handleFileChange = (files: File[], validFiles: File[]) => {
    const newDocuments: Document[] = [];

    if (validFiles.length < files.length) {
      setError &&
        setError(
          'Some files could not be uploaded because they are larger than 10MB, have names longer than 100 characters, or are in an unsupported format. Supported formats include: TXT, PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, and JPEG.'
        );
    } else {
      files.forEach((file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        let base64Prefix: string = '';
        let base64Document;

        reader.onloadend = () => {
          const result = reader.result as string;

          const match = result.split(',');
          if (match) {
            base64Prefix = match[0] ?? '';
            base64Document = match[1];
          }

          newDocuments.push({
            documentId: null,
            documentName: file.name,
            base64Document: result,
            base64Prefix: base64Prefix,
          });
          // Update the state or Formik helpers only when all files are processed
          if (newDocuments.length === files.length) {
            handleAddDocuments([...documents, ...newDocuments]);
          }
        };
      });
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(event.dataTransfer.files);
      const validFiles = droppedFiles.filter(
        (file) =>
          file.size <= 10 * 1024 * 1024 &&
          validFileTypes.includes(file.type as ValidFileType) &&
          file.name.length <= 100
      );

      handleFileChange(droppedFiles, validFiles);
    }
  };

  return (
    <VStack width="full" spacing="51px">
      <FormControl isInvalid={error !== undefined}>
        <Input
          id="documents"
          display="none"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(event.currentTarget.files ?? []) as File[]; // Convert FileList to array
            const validFiles = files.filter(
              (file) =>
                file.size <= 10 * 1024 * 1024 &&
                validFileTypes.includes(file.type as ValidFileType) &&
                file.name.length <= 100
            );
            handleFileChange(files, validFiles);
            // Reset input value so the same file can be selected again
            event.target.value = '';
          }}
          type="file"
          accept={
            acceptableFormat ??
            '.pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .jpeg, .jpg'
          }
          multiple
        />

        <VStack
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          justifyContent="center"
          spacing="24px"
          borderStyle="dashed"
          borderWidth="1px"
          borderColor={
            isDragging ? 'primary.500' : error ? 'error.500' : 'neutral.300'
          }
          bgColor={
            isDragging ? 'neutral.300' : error ? 'error.200' : 'neutral.100'
          }
          width="full"
          height="full"
          rounded="8px"
          pt="21px"
          pb="10px"
        >
          <VStack spacing="4px">
            <Icon as={DocumentIcon} boxSize="24px" color="neutral.600" />
            <Text size="md" color="neutral.600">
              Drop file in here or
            </Text>
            <Stack
              direction={variant === 'primary' ? 'row' : 'column'}
              spacing="8px"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
            >
              <label htmlFor="documents">
                <Text size="md" color="blue.500" fontWeight={800} role="button">
                  Click to browse (Up to 10MB)
                </Text>
              </label>
              {handleOpenExistingDocumentModal && (
                <Text size="md" color="neutral.600">
                  Or
                </Text>
              )}

              {handleOpenExistingDocumentModal && (
                <Text
                  size="md"
                  color="blue.500"
                  fontWeight={800}
                  role="button"
                  onClick={handleOpenExistingDocumentModal}
                >
                  Link Existing Document(s)
                </Text>
              )}
            </Stack>
          </VStack>
          <Text
            size="md"
            color="neutral.600"
            width="full"
            textAlign="center"
            px="10px"
          >
            {acceptableText ||
              'TXT, PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, JPEG are supported'}
          </Text>
        </VStack>
        <FormErrorMessage
          color="error.500"
          fontSize="12px"
          fontWeight={500}
          lineHeight="14.26px"
          mt="4px"
        >
          <Flex width="full" gap="8px">
            <Icon as={InfoIcon} color="error.500" />
            {error}
          </Flex>
        </FormErrorMessage>
      </FormControl>
      {showDocumentView && (
        <VStack width="full" spacing="4px">
          {_.isArray(documents) &&
            documents?.map((item: Document, index: number) => (
              <SingleDocument
                document={item}
                variant={variant}
                key={index}
                handleRemoveDocument={(document) =>
                  handleRemoveDocuments(document)
                }
              />
            ))}
        </VStack>
      )}
    </VStack>
  );
};

export default DocumentUploadAndView;
