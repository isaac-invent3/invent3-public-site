import { HStack, Text, VStack } from '@chakra-ui/react';
import { useAppSelector } from '~/lib/redux/hooks';

import { dateFormatter } from '~/lib/utils/Formatters';

const TemplateInfo = () => {
  const template = useAppSelector((state) => state.template.template);

  return (
    <HStack
      width="full"
      spacing="47px"
      bgColor="primary.500"
      p="16px"
      roundedTop="8px"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      {/* Left Side Start */}
      <HStack spacing="32px" alignItems="flex-start">
        <VStack alignItems="flex-start" spacing="8px">
          <Text color="neutral.300">Template Name:</Text>
          <Text
            color="white"
            fontWeight={700}
            fontSize="18px"
            lineHeight="21.38px"
            maxW="238px"
          >
            {template?.templateName}
          </Text>
        </VStack>
        <VStack alignItems="flex-start" spacing="8px">
          <Text color="neutral.300">Description:</Text>
          <Text color="white" size="md" maxW="253px">
            {template?.description}
          </Text>
        </VStack>
      </HStack>
      {/* Left Side Ends */}

      {/* Right Side Start */}
      <HStack spacing="32px" alignItems="flex-start">
        <VStack alignItems="flex-start" spacing="8px">
          <Text color="neutral.300">Context:</Text>
          <Text color="white">{template?.contextId}</Text>
          <Text color="white" fontWeight={800} size="lg">
            {template?.systemContextTypeDisplayName}
          </Text>
        </VStack>
        <VStack alignItems="flex-start" spacing="8px">
          <Text color="neutral.300">Created By:</Text>
          <Text color="white" size="lg" fontWeight={800}>
            {template?.createdBy}
          </Text>
        </VStack>
        <VStack alignItems="flex-start" spacing="8px">
          <Text color="neutral.300">Created Date:</Text>
          <Text color="white" size="lg" fontWeight={800}>
            {dateFormatter(template?.dateCreated, 'DD-MM-YYYY')}
          </Text>
        </VStack>
      </HStack>
      {/* Right Side Ends */}
    </HStack>
  );
};

export default TemplateInfo;
