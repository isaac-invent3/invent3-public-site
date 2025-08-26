/* eslint-disable no-unused-vars */
import {
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { DeleteIcon, InfoIcon } from '~/lib/components/CustomIcons';
import { Document, ValidFileType } from '~/lib/interfaces/general.interfaces';
import _ from 'lodash';
import { Button } from '@repo/ui/components';

interface AttachFileProps {
  variant?: 'primary' | 'secondary';
  handleAddDocuments: (document: Document) => void;
  handleRemoveDocuments: () => void;
  document?: Document;
  setError?: (error: string) => void;
  error?: string | undefined;
  validTypes?: ValidFileType[];
  acceptableText?: string;
  acceptableFormat?: string;
}

const AttachFile = (props: AttachFileProps) => {
  const {
    variant,
    handleAddDocuments,
    handleRemoveDocuments,
    document,
    setError,
    error,
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
          if (newDocuments.length > 0) {
            handleAddDocuments(newDocuments[0] as Document);
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
    <FormControl isInvalid={error !== undefined}>
      <Input
        id="attachement"
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
        multiple={false}
      />

      <HStack
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        spacing="8px"
        borderStyle="dashed"
        borderWidth="1px"
        borderColor={isDragging ? 'primary.500' : error ? 'error.500' : 'none'}
        bgColor={isDragging ? 'neutral.300' : error ? 'error.200' : '#E7E7E7'}
        width="full"
        height="full"
        rounded="8px"
        py="5px"
        px="6px"
        alignItems="flex-start"
      >
        <label htmlFor="attachement">
          <Button
            customStyles={{
              height: '40px',
              width: '97px',
              as: 'p',
              cursor: 'pointer',
            }}
          >
            Choose File
          </Button>
        </label>
        {document && (
          <HStack>
            <Text size="md" color="black">
              {document?.documentName ?? ''}
            </Text>
            <Icon
              as={DeleteIcon}
              boxSize="16px"
              color="error.500"
              cursor="pointer"
              onClick={handleRemoveDocuments}
            />
          </HStack>
        )}
      </HStack>
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
  );
};

export default AttachFile;
