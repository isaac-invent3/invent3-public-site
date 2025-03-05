import { Flex, Stack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import DocumentSummaryView from '~/lib/components/Common/DocumentUploadAndView/DocumentSummaryView';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';

const SectionOne = () => {
  const { logo, vendorDocuments } = useAppSelector(
    (state) => state.vendor.vendorForm
  );

  return (
    <Stack
      flexDir={{ base: 'column', md: 'row' }}
      width="full"
      spacing="64px"
      alignItems="flex-start"
    >
      <VStack
        spacing="8px"
        width={{ base: 'full', md: '177px' }}
        alignItems="flex-start"
      >
        <DetailHeader variant="primary">Logo</DetailHeader>
        {logo ? (
          <Flex position="relative" width="100px" height="75px" bgSize="cover">
            <Image
              src={
                logo.base64Prefix
                  ? `${logo.base64Prefix}${logo.base64PhotoImage}`
                  : logo.base64PhotoImage
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
            No Logo added
          </Text>
        )}
      </VStack>
      <Flex width={{ base: 'full', md: '230px' }}>
        <DocumentSummaryView documents={vendorDocuments} />
      </Flex>
    </Stack>
  );
};

export default SectionOne;
