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
          <HStack spacing="12px" wrap="wrap" width="full" maxW="max-content">
            {meta.value.length >= 1 &&
              meta.value.map((image: File | string, index: number) => (
                <Box
                  key={index}
                  bgImage={
                    image && typeof image === 'string'
                      ? image
                      : URL.createObjectURL(image as File)
                  }
                  bgSize="cover"
                  bgRepeat="no-repeat"
                  width="100px"
                  height="75px"
                  rounded="8px"
                  p="8px"
                >
                  <Flex justifyContent="flex-end">
                    <Icon
                      as={CircularCloseIcon}
                      boxSize={{ base: '18px', md: '24px' }}
                      cursor="pointer"
                      onClick={() => handleRemoveImage(image)}
                    />
                  </Flex>
                </Box>
              ))}
          </HStack>
          {/* Display */}
          <FormControl isInvalid={meta.touched && meta.error !== undefined}>
            <Input
              id="file"
              display="none"
              onChange={(event: any) => {
                event.currentTarget.files.length > 0 &&
                  helpers.setValue([
                    ...meta.value,
                    event.currentTarget.files[0],
                  ]);
                // eslint-disable-next-line no-param-reassign
                event.target.value = '';
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
                borderColor={meta.error ? 'error.500' : '#BBBBBB'}
                bgColor={meta.error ? 'error.200' : '#F6F6F6'}
                color="primar.main"
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
        </HStack>
      </HStack>
    ),
    [meta.value, meta.error] //eslint-disable-line
  );
};

export default AssetImages;
