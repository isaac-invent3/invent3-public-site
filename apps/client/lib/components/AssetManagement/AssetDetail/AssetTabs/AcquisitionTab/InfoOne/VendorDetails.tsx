import { Heading, HStack, StackDivider, Text, VStack } from '@chakra-ui/react';
import DetailHeader from '../../../../../UI/DetailHeader';
import { AcquisitionInfo } from '~/lib/interfaces/asset/general.interface';

interface VendorTextsProps {
  data: AcquisitionInfo | undefined;
}
const VendorTexts = (props: VendorTextsProps) => {
  const { data } = props;
  const someFieldExists = [
    data?.vendorName,
    data?.vendorAddress,
    data?.vendorContactEmail,
    data?.vendorContactNo,
  ].some(Boolean);

  return (
    <VStack
      width="full"
      alignItems="flex-start"
      bgColor="neutral.100"
      p="8px"
      rounded="8px"
      spacing="16px"
    >
      <DetailHeader variant="secondary">Vendor's Details</DetailHeader>
      {someFieldExists ? (
        <HStack
          spacing="24px"
          alignItems="flex-start"
          divider={
            data?.vendorName ? <StackDivider borderColor="#BBBBBB80" /> : <></>
          }
        >
          <VStack spacing="4px" alignItems="flex-start">
            <Heading as="h5" size="md" color="black" fontWeight={700}>
              {data?.vendorName}
            </Heading>
            <Text size="md" color="neutral.600">
              {data?.vendorAddress}
            </Text>
          </VStack>
          <VStack spacing="4px" alignItems="flex-start">
            {data?.vendorName && (
              <Text size="md" color="black">
                Contact Person
              </Text>
            )}
            <Text size="md" color="neutral.600">
              {data?.vendorName}
            </Text>
            <Text size="md" color="neutral.600">
              {data?.vendorContactNo}
            </Text>
            <Text size="md" color="neutral.600">
              {data?.vendorContactEmail}
            </Text>
          </VStack>
        </HStack>
      ) : (
        <Text
          textAlign="center"
          size="md"
          width="full"
          color="neutral.600"
          my="20px"
        >
          No data found.
        </Text>
      )}
    </VStack>
  );
};

export default VendorTexts;
