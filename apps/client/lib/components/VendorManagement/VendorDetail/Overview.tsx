import { Flex, Heading, HStack, VStack } from '@chakra-ui/react';
import Detail from '~/lib/components/UI/ContentDetails/Detail';
import { useAppSelector } from '~/lib/redux/hooks';

const Overview = () => {
  const vendorData = useAppSelector((state) => state.vendor.vendor);

  if (!vendorData) {
    return null;
  }

  const { vendorName } = vendorData;

  const vendorInfo1 = [
    {
      label: 'Category:',
      value: 'Maintenance',
    },
    {
      label: 'Contact Name:',
      value: 'John Doe',
    },
    {
      label: 'Contact Email:',
      value: 'JohnDoe@gmail.com',
    },
    {
      label: 'Contact Number:',
      value: '+234 333 22333',
    },
  ];

  const vendorInfo2 = [
    {
      label: 'Contract Status:',
      value: 'Active',
    },
    {
      label: 'Compliance status:',
      value: 'Verified',
    },
  ];

  return (
    <HStack
      width="full"
      pt="24px"
      pb="20px"
      px="32px"
      bgColor="#B4BFCA4D"
      spacing="24px"
      alignItems="flex-start"
    >
      <Flex
        height="175px"
        width="216px"
        rounded="16px"
        bgColor="white"
        overflow="hidden"
        flexShrink={0}
      >
        <Flex
          width="full"
          height="full"
          bgSize="contain"
          bgRepeat="no-repeat"
          bgPosition="center"
          mx="8px"
          bgColor="neutral.200"
        />
      </Flex>
      <VStack alignItems="flex-start" width="full" spacing="16px">
        <Heading as="h3" fontSize="32px" lineHeight="38.02px" fontWeight={800}>
          {vendorName}
        </Heading>
        <HStack width="full" spacing="18px" alignItems="flex-start">
          <VStack alignItems="flex-start" spacing="8px">
            {vendorInfo1.map((info, index) => (
              <Detail {...info} key={index} labelMinWidth="107px" />
            ))}
          </VStack>
          <VStack alignItems="flex-start" spacing="8px">
            {vendorInfo2.map((info, index) => (
              <Detail {...info} key={index} labelMinWidth="107px" />
            ))}
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Overview;
