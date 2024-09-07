import {
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../SectionInfo';
import { useField } from 'formik';
import { DocumentIcon, InfoIcon } from '~/lib/components/CustomIcons';
import SingleDocument from './SingleDocument';

const AddDocument = () => {
  const [field, meta, helpers] = useField('documents'); //eslint-disable-line
  return (
    <HStack width="full" alignItems="flex-start" spacing="81px">
      <Flex width="full" maxW="141px">
        <SectionInfo
          title="Upload Documents"
          info="Size max: 10MB each Format: JPG, PNG"
          isRequired={false}
        />
      </Flex>
      <VStack width="full" spacing="51px">
        <FormControl isInvalid={meta.touched && meta.error !== undefined}>
          <Input
            id="file"
            display="none"
            onChange={(event: any) => {
              if (event.currentTarget.files.length > 0) {
                if (event.currentTarget.files[0].size > 10 * 1024 * 1024) {
                  helpers.setError('File size must be less than 10 MB');
                } else {
                  if (!meta.value.includes(event.currentTarget.files[0])) {
                    helpers.setValue([
                      ...meta.value,
                      event.currentTarget.files[0],
                    ]);
                    // eslint-disable-next-line no-param-reassign
                    event.target.value = '';
                  }
                }
              }
            }}
            type="file"
            accept=".pdf, .doc, .docx"
          />
          <label htmlFor="file">
            <VStack
              justifyContent="center"
              spacing="24px"
              borderStyle="dashed"
              borderWidth="1px"
              borderColor={meta.error ? 'error.500' : 'neutral.300'}
              bgColor={meta.error ? 'error.200' : 'neutral.100'}
              width="full"
              height="full"
              rounded="8px"
              cursor="pointer"
              pt="21px"
              pb="10px"
            >
              <VStack spacing="4px">
                <Icon as={DocumentIcon} boxSize="24px" color="neutral.600" />
                <Text size="md" color="neutral.600">
                  Drop file in here or
                </Text>
                <Text size="md" color="primary.500" fontWeight={800}>
                  Click to browse (Up to 10MB)
                </Text>
              </VStack>
              <Text size="md" color="neutral.600">
                PDF, DOC are supported
              </Text>
            </VStack>
          </label>
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
          {meta.value.map((item: File, index: number) => (
            <SingleDocument document={item} key={index} />
          ))}
        </VStack>
      </VStack>
    </HStack>
  );
};

export default AddDocument;
