import {
  Badge,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  Input,
  Text,
} from '@chakra-ui/react';
import { FormInputWrapper } from '@repo/ui/components';
import { useField } from 'formik';
import { useMemo } from 'react';
import {
  AddIcon,
  AttachmentIcon,
  CircularCloseIcon,
  InfoIcon,
} from '~/lib/components/CustomIcons';
import { CompanyFormImage } from '~/lib/interfaces/company.interfaces';

const CompanyLogo = () => {
  const [field, meta, helpers] = useField('companyLogo'); //eslint-disable-line

  const handleRemoveImage = () => {
    helpers.setValue(null);
  };

  const handleSetPrimaryImage = (image: CompanyFormImage) => {
    helpers.setValue(image);
  };

  const image = meta.value;

  return useMemo(
    () => (
      <FormInputWrapper
        sectionMaxWidth="141px"
        customSpacing="47px"
        description="Size max: 10MB each Format: JPG, PNG"
        title="Company Logo"
        isRequired
        direction={{ base: 'column', md: 'row' }}
      >
        <HStack spacing="12px" alignItems="flex-start" width="full">
          {/* Display */}
          {image && (
            <Box
              bgImage={
                image.base64Prefix
                  ? `${image.base64Prefix}${image.base64PhotoImage}`
                  : image.base64PhotoImage
              }
              bgSize="cover"
              bgRepeat="no-repeat"
              width={{ base: '73px', md: '100px' }}
              height={{ base: '51px', md: '75px' }}
              rounded="8px"
              position="relative"
              role="group"
              overflow="hidden"
            >
              {image.isPrimaryImage && (
                <Badge
                  position="absolute"
                  top="5px"
                  left="5px"
                  colorScheme="green"
                  fontSize="10px"
                  rounded="4px"
                >
                  Primary
                </Badge>
              )}
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
                  onClick={handleRemoveImage}
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
                <HStack
                  spacing="8px"
                  cursor="pointer"
                  onClick={() => handleSetPrimaryImage(image)}
                >
                  <Text
                    fontSize="10px"
                    lineHeight="11.88px"
                    color="white"
                    whiteSpace="nowrap"
                    fontWeight={500}
                  >
                    {image.isPrimaryImage ? 'Primary' : 'Make Primary'}
                  </Text>
                  <Icon as={AttachmentIcon} boxSize="18px" color="white" />
                </HStack>
              </Flex>
            </Box>
          )}

          {/* Display */}
          {!image && (
            <HStack alignItems="flex-start" spacing="12px">
              <FormControl isInvalid={meta.touched && meta.error !== undefined}>
                <Input
                  id="file"
                  display="none"
                  onChange={(event: any) => {
                    const files = Array.from(
                      event.currentTarget.files
                    ) as File[]; // Convert FileList to array
                    if (files.length > 0) {
                      files.forEach((file: File) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);

                        reader.onloadend = () => {
                          const base64PhotoImage = reader.result as string;

                          const newImage = {
                            imageId: null,
                            imageName: file.name,
                            base64PhotoImage: base64PhotoImage,
                            base64Prefix: null,
                          };

                          newImage && helpers.setValue(newImage);
                        };
                      });
                    }

                    event.target.value = ''; // Clear the input after selecting files
                  }}
                  type="file"
                  accept="image/*"
                  multiple // Enable multiple image uploads
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
                    width={{ base: '90px', md: '140px' }}
                    height={{ base: '51px', md: '75px' }}
                    rounded="8px"
                    cursor="pointer"
                  >
                    <Icon as={AddIcon} boxSize="18px" />
                    <Text size={{ base: 'xs', md: 'base' }}>Add Image</Text>
                  </HStack>
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
            </HStack>
          )}
        </HStack>
      </FormInputWrapper>
    ),
    [meta.value, meta.error, meta.touched] //eslint-disable-line
  );
};

export default CompanyLogo;
