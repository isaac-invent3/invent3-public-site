import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import DocumentSummaryView from '~/lib/components/Common/DocumentUploadAndView/DocumentSummaryView';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';

const SectionOne = () => {
  const { logo, slaDocuments } = useAppSelector(
    (state) => state.vendor.vendorForm
  );

  return (
    <HStack width="full" spacing="64px" alignItems="flex-start">
      <VStack spacing="8px" width="177px" alignItems="flex-start">
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
      <Flex width="230px">
        <DocumentSummaryView documents={slaDocuments} />
      </Flex>
    </HStack>
  );
};

export default SectionOne;
