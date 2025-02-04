import {
  Box,
  Flex,
  FormControl,
  HStack,
  Icon,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useField } from 'formik';
import { AddIcon, CircularCloseIcon } from '~/lib/components/CustomIcons';
import { ErrorMessage } from '@repo/ui/components';

interface FormImageUploadProps {
  name: string;
  actionText?: string;
}

const FormImageUpload = (props: FormImageUploadProps) => {
  const { name, actionText } = props;
  const [field, meta, helpers] = useField(name); //eslint-disable-line

  return useMemo(
    () => (
      <HStack spacing="12px" alignItems="flex-start" width="full">
        {/* Display */}
        {meta.value && (
          <Box
            bgImage={
              meta.value.base64Prefix
                ? `${meta.value.base64Prefix}${meta.value.base64PhotoImage}`
                : meta.value.base64PhotoImage
            }
            bgSize="cover"
            bgRepeat="no-repeat"
            width="100px"
            height="75px"
            rounded="8px"
            position="relative"
            role="group"
            overflow="hidden"
          >
            <Flex
              position="absolute"
              bgColor="#333333E5"
              top={0}
              bottom={0}
              left={0}
              right={0}
              display="none"
              _groupHover={{ display: 'flex' }}
            />
            <Flex
              alignItems="flex-end"
              direction="column"
              position="relative"
              gap="4px"
              zIndex={99}
              p="8px"
              display="none"
              _groupHover={{ display: 'flex' }}
            >
              <HStack
                spacing="8px"
                cursor="pointer"
                onClick={() => helpers.setValue(null)}
              >
                <Text
                  fontSize="10px"
                  lineHeight="11.88px"
                  color="#FF382D"
                  fontWeight={500}
                >
                  Delete
                </Text>
                <Icon as={CircularCloseIcon} boxSize="18px" color="#FF3B30" />
              </HStack>
            </Flex>
          </Box>
        )}

        {/* Display */}
        {meta.value === null && (
          <HStack alignItems="flex-start" spacing="12px">
            <FormControl isInvalid={meta.touched && meta.error !== undefined}>
              <Input
                id="file"
                display="none"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const fileList = event.currentTarget.files;

                  if (fileList && fileList.length > 0) {
                    const file = fileList[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file as Blob);

                    reader.onloadend = () => {
                      if (reader.result) {
                        const base64PhotoImage = reader.result as string;

                        const image = {
                          imageId: null,
                          imageName: file && file.name,
                          base64PhotoImage,
                          base64Prefix: null,
                        };

                        // Update the Formik helpers with the processed image
                        helpers.setValue(image);
                      }

                      // Clear the input after the file is processed
                      event.target.value = '';
                    };
                  }
                }}
                type="file"
                accept="image/*"
              />
              <label htmlFor="file">
                <HStack
                  justifyContent="center"
                  spacing="4px"
                  borderStyle="dashed"
                  borderWidth="1px"
                  borderColor={
                    meta.touched && meta.error !== undefined
                      ? 'error.500'
                      : '#BBBBBB'
                  }
                  bgColor={
                    meta.touched && meta.error !== undefined
                      ? 'error.200'
                      : '#F6F6F6'
                  }
                  color="primary.500"
                  width="140px"
                  height="75px"
                  rounded="8px"
                  cursor="pointer"
                >
                  <Icon as={AddIcon} boxSize="18px" color="blue.500" />
                  <Text color="blue.500">{actionText ?? 'Add Picture'}</Text>
                </HStack>
              </label>
              {meta.touched && meta.error !== undefined && (
                <Flex mt="4px">
                  <ErrorMessage>{meta.error}</ErrorMessage>
                </Flex>
              )}
            </FormControl>
          </HStack>
        )}
      </HStack>
    ),
    [meta.value, meta.error, meta.touched] //eslint-disable-line
  );
};

export default FormImageUpload;
