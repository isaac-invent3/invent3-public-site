import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import SectionInfo from '../SectionInfo';
import { useField } from 'formik';
import {
  AddIcon,
  AttachmentIcon,
  CircularCloseIcon,
  InfoIcon,
} from '~/lib/components/CustomIcons';

const AssetImages = () => {
  const [field, meta, helpers] = useField('images'); //eslint-disable-line

  const handleRemoveImage = (image: any) => {
    const newValue = meta.value.filter(
      (old: { name: string }) => old !== image
    );
    helpers.setValue(newValue);
  };

  const handleSetPrimaryImage = (image: any) => {
    const updatedImages = meta.value.map((img: any) => ({
      ...img,
      isPrimaryImage: img === image,
    }));
    helpers.setValue(updatedImages);
  };

  return useMemo(
    () => (
      <HStack width="full" alignItems="flex-start" spacing="104px">
        <Flex width="full" maxW="118px">
          <SectionInfo
            title="Asset Images"
            info="Size max: 10MB each Format: JPG, PNG"
            isRequired
          />
        </Flex>
        <HStack spacing="12px" alignItems="flex-start" width="full">
          {/* Display */}
          {meta.value.length >= 1 && (
            <HStack spacing="12px" wrap="wrap" width="full" maxW="max-content">
              {meta.value.map(
                (
                  image: {
                    imageName: string;
                    base64PhotoImage: string;
                    isPrimaryImage: boolean;
                  },
                  index: number
                ) => (
                  <Box
                    key={index}
                    bgImage={image.base64PhotoImage}
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
                        onClick={() => handleRemoveImage(image)}
                      >
                        <Text
                          fontSize="10px"
                          lineHeight="11.88px"
                          color="#FF382D"
                          fontWeight={500}
                        >
                          Delete
                        </Text>
                        <Icon
                          as={CircularCloseIcon}
                          boxSize="18px"
                          color="#FF3B30"
                        />
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
                          {image.isPrimaryImage ? 'Default' : 'Make Default'}
                        </Text>
                        <Icon
                          as={AttachmentIcon}
                          boxSize="18px"
                          color="white"
                        />
                      </HStack>
                    </Flex>
                  </Box>
                )
              )}
            </HStack>
          )}
          {/* Display */}
          <HStack alignItems="flex-start" spacing="12px">
            <FormControl isInvalid={meta.error !== undefined}>
              <Input
                id="file"
                display="none"
                onChange={(event: any) => {
                  const files = Array.from(event.currentTarget.files) as File[]; // Convert FileList to array
                  if (files.length > 0) {
                    const newImages: any[] = [];

                    files.forEach((file: File) => {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);

                      reader.onloadend = () => {
                        const base64PhotoImage = reader.result as string;

                        newImages.push({
                          imageId: null,
                          imageName: file.name,
                          base64PhotoImage: base64PhotoImage,
                          isPrimaryImage: false,
                        });

                        // Update the state or Formik helpers only when all images are processed
                        if (newImages.length === files.length) {
                          helpers.setValue([...meta.value, ...newImages]);
                        }
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
                  borderColor={meta.error ? 'error.500' : '#BBBBBB'}
                  bgColor={meta.error ? 'error.200' : '#F6F6F6'}
                  color="primary.main"
                  width="140px"
                  height="75px"
                  rounded="8px"
                  cursor="pointer"
                >
                  <Icon as={AddIcon} boxSize="18px" />
                  <Text>Add Images</Text>
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
            {meta.value.length >= 1 && (
              <HStack
                spacing="8px"
                p="8px"
                rounded="8px"
                bgColor="#0366EF0D"
                whiteSpace="nowrap"
              >
                <Icon as={InfoIcon} color="#0366EF" boxSize="12px" />
                <Text
                  fontSize="10px"
                  lineHeight="11.88px"
                  fontWeight={500}
                  color="#0366EF"
                >
                  Hover the image to select a default
                </Text>
              </HStack>
            )}
          </HStack>
        </HStack>
      </HStack>
    ),
    [meta.value, meta.error] //eslint-disable-line
  );
};

export default AssetImages;
