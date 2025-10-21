import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  Input,
  Text,
  Badge,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useField } from 'formik';
import {
  AddIcon,
  AttachmentIcon,
  CircularCloseIcon,
  InfoIcon,
} from '~/lib/components/CustomIcons';
import { AssetFormImage } from '~/lib/interfaces/asset/general.interface';
import { FormInputWrapper } from '@repo/ui/components';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';

const AssetImages = () => {
  const dispatch = useAppDispatch();
  const existingDeletedImages = useAppSelector(
    (state) => state.asset.assetForm.deletedImageIds
  );
  const [field, meta, helpers] = useField('images'); //eslint-disable-line

  const handleRemoveImage = (image: AssetFormImage) => {
    const newValue = meta.value.filter((old: AssetFormImage) => old !== image);
    helpers.setValue(newValue);
    if (image.imageId) {
      dispatch(
        updateAssetForm({
          deletedImageIds: [...existingDeletedImages, image.imageId],
        })
      );
    }
  };

  const handleSetPrimaryImage = (image: AssetFormImage) => {
    const updatedImages = meta.value.map((img: AssetFormImage) => ({
      ...img,
      isPrimaryImage: img === image,
    }));
    helpers.setValue(updatedImages);
  };

  return useMemo(
    () => (
      <FormInputWrapper
        sectionMaxWidth="118px"
        customSpacing="104px"
        description="Size max: 10MB each Format: JPG, PNG"
        title="Asset Images"
        isRequired
        direction={{ base: 'column', md: 'row' }}
        formSectionCustomStyle={{
          maxW: { md: '118px' },
        }}
      >
        <HStack spacing="12px" alignItems="flex-start" width="full">
          {/* Display */}
          {meta.value.length >= 1 && (
            <HStack spacing="12px" wrap="wrap" width="full" maxW="max-content">
              {meta.value.map((image: AssetFormImage, index: number) => (
                <Box
                  key={index}
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
                        {image.isPrimaryImage ? 'Primary' : 'Make Primary'}
                      </Text>
                      <Icon as={AttachmentIcon} boxSize="18px" color="white" />
                    </HStack>
                  </Flex>
                </Box>
              ))}
            </HStack>
          )}
          {/* Display */}
          <HStack alignItems="flex-start" spacing="12px">
            <FormControl isInvalid={meta.touched && meta.error !== undefined}>
              <Input
                id="file"
                display="none"
                onChange={(event: any) => {
                  const files = Array.from(event.currentTarget.files) as File[]; // Convert FileList to array
                  if (files.length > 0) {
                    const newImages: any[] = [];

                    files.forEach((file: File, index: number) => {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);

                      reader.onloadend = () => {
                        const base64PhotoImage = reader.result as string;

                        newImages.push({
                          imageId: null,
                          imageName: file.name,
                          base64PhotoImage: base64PhotoImage,
                          base64Prefix: null,
                          isPrimaryImage:
                            meta.value.length === 0 && index === 0, // Set the first uploaded image as primary
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
                accept="image/png, image/jpeg, image/jpg"
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
                  <Text size={{ base: 'xs', md: 'base' }}>Add Images</Text>
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
        </HStack>
      </FormInputWrapper>
    ),
    [meta.value, meta.error, meta.touched] //eslint-disable-line
  );
};

export default AssetImages;
