import { HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  useApplyAnMLInsightMutation,
  useGetMLInsightSuggestionsQuery,
} from '~/lib/redux/services/dashboard/ai';
import { MLInsightSuggestion } from '~/lib/interfaces/dashboard/aiinsights.interfaces';
import { Button, EmptyState } from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import CardHeader from '../../../Common/CardHeader';

const Suggestion = ({ data }: { data: MLInsightSuggestion }) => {
  const { title, estimatedSavings } = data;
  const { handleSubmit } = useCustomMutation();
  const [applySuggestion, { isLoading }] = useApplyAnMLInsightMutation();

  const handleApply = async () => {
    await handleSubmit(
      applySuggestion,
      { id: 1 },
      'Suggestion Applied Successfully'
    );
  };
  return (
    <HStack
      width="full"
      justifyContent="space-between"
      alignItems="flex-start"
      py={3}
      px={4}
      rounded="16px"
      bgColor="#F5F5F5"
      height="min-content"
    >
      <VStack spacing={2} alignItems="flex-start">
        <Text color="black" fontWeight={700} size="md">
          {title}
        </Text>
        <Text color="neutral.600" fontWeight={400}>
          Estimated savings: <Text as="span">{estimatedSavings}</Text>
        </Text>
      </VStack>
      <Button
        customStyles={{ width: '153px', height: '46px' }}
        handleClick={handleApply}
        isLoading={isLoading}
        loadingText="Applying..."
      >
        Apply
      </Button>
    </HStack>
  );
};

const Suggestions = () => {
  const { data, isLoading } = useGetMLInsightSuggestionsQuery();
  return (
    <VStack
      width="full"
      height="min-content"
      alignItems="flex-start"
      spacing="22px"
    >
      <CardHeader>Energy Optimization Suggestions</CardHeader>
      {isLoading && (
        <VStack width="full" spacing={2}>
          {Array(4)
            .fill('')
            .map((_, index) => (
              <Skeleton width="full" key={index} height="60px" rounded="6px" />
            ))}
        </VStack>
      )}
      {!isLoading && data?.data && data?.data?.length > 0 && (
        <VStack width="full" spacing={2}>
          {data?.data?.map((item, index) => (
            <Suggestion data={item} key={index} />
          ))}
        </VStack>
      )}
      {!isLoading && data?.data?.length === 0 && <EmptyState />}
    </VStack>
  );
};

export default Suggestions;
