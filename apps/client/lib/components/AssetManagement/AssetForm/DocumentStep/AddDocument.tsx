import {
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  Input,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useField } from 'formik';
import { DocumentIcon, InfoIcon } from '~/lib/components/CustomIcons';
import { AssetFormDocument } from '~/lib/interfaces/asset.interfaces';
import ExistingDocumentModal from './ExistingDocumentModal';
import SingleDocument from './SingleDocument';

interface AddDocumentProps {
  variant?: 'primary' | 'secondary';
}

const AddDocument = ({ variant }: AddDocumentProps) => {
  const [field, meta, helpers] = useField('documents'); // eslint-disable-line
  const [isDragging, setIsDragging] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const handleFileChange = (files: File[], validFiles: File[]) => {
    const newDocuments: any[] = [];

    if (validFiles.length < files.length) {
      helpers.setError(
        'Some files could not be uploaded because they are larger than 10MB, have names longer than 100 characters, or are in an unsupported format. Supported formats include: TXT, PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, and JPEG.'
      );
    } else {
      files.forEach((file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          const baseDocument = reader.result as string;

          newDocuments.push({
            documentId: null,
            documentName: file.name,
            base64Document: baseDocument,
            base64Prefix: null,
          });

          // Update the state or Formik helpers only when all files are processed
          if (newDocuments.length === files.length) {
            helpers.setValue([...meta.value, ...newDocuments]);
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
          validFileTypes.includes(file.type) &&
          file.name.length <= 100
      );

      handleFileChange(droppedFiles, validFiles);
    }
  };

  return (
    <>
      <VStack width="full" spacing="51px">
        <FormControl isInvalid={meta.error !== undefined}>
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
              isDragging
                ? 'primary.500'
                : meta.error
                  ? 'error.500'
                  : 'neutral.300'
            }
            bgColor={
              isDragging
                ? 'neutral.300'
                : meta.error
                  ? 'error.200'
                  : 'neutral.100'
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
              <HStack spacing="8px">
                <label htmlFor="document">
                  <Text
                    size="md"
                    color="primary.500"
                    fontWeight={800}
                    role="button"
                  >
                    Click to browse (Up to 10MB)
                  </Text>
                </label>
                <Text size="md" color="neutral.600">
                  Or
                </Text>
                <Text
                  size="md"
                  color="primary.500"
                  fontWeight={800}
                  role="button"
                  onClick={onOpen}
                >
                  Link Existing Document(s)
                </Text>
              </HStack>
            </VStack>
            <Text size="md" color="neutral.600" width="full" textAlign="center">
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
              {meta.error}
            </Flex>
          </FormErrorMessage>
        </FormControl>
        <VStack width="full" spacing="4px">
          {meta.value.map((item: AssetFormDocument, index: number) => (
            <SingleDocument document={item} variant={variant} key={index} />
          ))}
        </VStack>
      </VStack>
      <ExistingDocumentModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddDocument;
