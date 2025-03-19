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
import { UploadedFile } from '@repo/interfaces';
import React, { useState } from 'react';
import { DocumentIcon, InfoIcon } from './CustomIcons';

interface DocumentUploadAndViewProps {
  variant?: 'primary' | 'secondary';
  files?: UploadedFile[] | UploadedFile | null;
  handleAddFiles?: (files: UploadedFile[]) => void;
  setError?: (error: string) => void;
  error?: string | undefined;
  isMulti?: boolean;
}

const FileUpload = (props: DocumentUploadAndViewProps) => {
  const {
    variant,
    files,
    handleAddFiles,
    setError,
    error,
    isMulti = true,
  } = props;

  const [isDragging, setIsDragging] = useState(false);

  // Updated valid file types for txt, word, excel, powerpoint, pdf, and images (jpeg)
  const validFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
    'application/vnd.ms-excel', // XLS
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
    'application/vnd.ms-powerpoint', // PPT
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PPTX
    'text/plain', // TXT
    'image/jpeg', // JPEG
  ];

  const handleFileChange = (droppedFiles: File[], validFiles: File[]) => {
    if (validFiles.length < droppedFiles.length && setError) {
      return setError(
        'Some files could not be uploaded because they are larger than 10MB, have names longer than 100 characters, or are in an unsupported format. Supported formats include: TXT, PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, and JPEG.'
      );
    }

    const uploadedFiles: UploadedFile[] = [];

    droppedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const baseDocument = reader.result as string;

        uploadedFiles.push({
          fileId: null,
          fileName: file.name,
          base64: baseDocument,
          base64Prefix: null,
        });

        // Update the state or Formik helpers only when all files are processed
        if (uploadedFiles.length === droppedFiles.length && handleAddFiles) {
          handleAddFiles(uploadedFiles);

          if (isMulti && files && Array.isArray(files)) {
            handleAddFiles([...uploadedFiles, ...files]);
          } else {
            handleAddFiles(uploadedFiles);
          }
        }
      };
    });
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
          validFileTypes.includes(file.type) &&
          file.name.length <= 100
      );

      handleFileChange(droppedFiles, validFiles);
    }
  };

  return (
    <VStack width="full" spacing="51px">
      <FormControl isInvalid={error !== undefined}>
        <Input
          id="document"
          display="none"
          onChange={(event: any) => {
            const files = Array.from(event.currentTarget.files) as File[]; // Convert FileList to array
            const validFiles = files.filter(
              (file) =>
                file.size <= 10 * 1024 * 1024 &&
                validFileTypes.includes(file.type) &&
                file.name.length <= 100
            );
            handleFileChange(files, validFiles);
          }}
          type="file"
          accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .jpeg, .jpg"
          multiple={isMulti}
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
              {!isMulti && files && !Array.isArray(files)
                ? files.fileName
                : 'Drop file in here or'}
            </Text>

            <Stack
              direction={variant === 'primary' ? 'row' : 'column'}
              spacing="8px"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
            >
              <label htmlFor="document">
                <Text size="md" color="blue.500" fontWeight={800} role="button">
                  Click to browse (Up to 10MB)
                </Text>
              </label>
            </Stack>
          </VStack>
          <Text
            size="md"
            color="neutral.600"
            width="full"
            textAlign="center"
            px="10px"
          >
            TXT, PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, JPEG are supported
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
    </VStack>
  );
};

export default FileUpload;
