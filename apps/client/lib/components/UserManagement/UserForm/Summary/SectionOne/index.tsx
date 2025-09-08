import { Flex, Stack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import DocumentSummaryView from '~/lib/components/Common/DocumentUploadAndView/DocumentSummaryView';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';

const SectionOne = () => {
  const { picture } = useAppSelector((state) => state.user.userForm);

  return (
    <Stack
      width="full"
      spacing="64px"
      alignItems="flex-start"
      flexDir={{ base: 'column', md: 'row' }}
    >
      <VStack
        spacing="8px"
        width={{ base: 'full', md: '177px' }}
        alignItems="flex-start"
      >
        <DetailHeader variant="primary">Picture</DetailHeader>
        {picture ? (
          <Flex position="relative" width="100px" height="75px" bgSize="cover">
            <Image
              src={
                picture.base64Prefix
                  ? `${picture.base64Prefix}${picture.base64PhotoImage}`
                  : picture.base64PhotoImage
              }
              alt="asset image"
              fill
            />
          </Flex>
        ) : (
          <Text
            fontStyle="italic"
            color="neutral.300"
            width="full"
            textAlign="center"
            my={4}
          >
            No Picture added
          </Text>
        )}
      </VStack>
    </Stack>
  );
};

export default SectionOne;
