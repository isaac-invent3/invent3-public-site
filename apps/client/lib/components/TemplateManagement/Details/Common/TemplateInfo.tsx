import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useAppSelector } from '~/lib/redux/hooks';

import { dateFormatter } from '~/lib/utils/Formatters';

const TemplateInfo = () => {
  const template = useAppSelector((state) => state.template.template);

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      width="full"
      gap={{ base: '24px', lg: '47px' }}
      bgColor="primary.500"
      p="16px"
      roundedTop={{ md: '8px' }}
      alignItems="flex-start"
      justifyContent="space-between"
    >
      {/* Left Side Start */}
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={{ base: '24px', lg: '32px' }}
        alignItems="flex-start"
      >
        <VStack alignItems="flex-start" spacing="8px">
          <Text color="neutral.300">Template Name:</Text>
          <Text
            color="white"
            fontWeight={700}
            fontSize={{ base: '14px', lg: '18px' }}
            lineHeight={{ base: '16.63px', lg: '21.38px' }}
            width="full"
            maxW={{ md: '238px' }}
          >
            {template?.templateName}
          </Text>
        </VStack>
        <VStack alignItems="flex-start" spacing="8px">
          <Text color="neutral.300">Description:</Text>
          <Text color="white" size="md" width="full" maxW={{ md: '253px' }}>
            {template?.description}
          </Text>
        </VStack>
      </SimpleGrid>
      {/* Left Side Ends */}

      {/* Right Side Start */}
      <SimpleGrid
        columns={{ base: 2, lg: 3 }}
        gap={{ base: '24px', lg: '32px' }}
        alignItems="flex-start"
      >
        <VStack alignItems="flex-start" spacing="8px">
          <Text color="neutral.300">Context:</Text>
          <Text color="white">{template?.contextId}</Text>
          <Text color="white" fontWeight={800} size={{ base: 'md', lg: 'lg' }}>
            {template?.systemContextTypeDisplayName}
          </Text>
        </VStack>
        <VStack alignItems="flex-start" spacing="8px">
          <Text color="neutral.300">Created By:</Text>
          <Text
            color="white"
            size={{ base: 'md', lg: 'lg' }}
            fontWeight={800}
            width="full"
            noOfLines={1}
            textOverflow="ellipsis"
          >
            {template?.createdBy}
          </Text>
        </VStack>
        <VStack alignItems="flex-start" spacing="8px">
          <Text color="neutral.300">Created Date:</Text>
          <Text color="white" size={{ base: 'md', lg: 'lg' }} fontWeight={800}>
            {dateFormatter(template?.dateCreated, 'DD-MM-YYYY')}
          </Text>
        </VStack>
      </SimpleGrid>
      {/* Right Side Ends */}
    </SimpleGrid>
  );
};

export default TemplateInfo;
