import { HStack, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import React from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  useApplyAnMLInsightMutation,
  useGetMLRecommendationsSummaryQuery,
} from '~/lib/redux/services/dashboard/ai';

interface ImpactProps {
  title: string;
  description?: string;
  color: string;
  savings?: string;
}
const ImpactCard = ({ data }: { data: ImpactProps }) => {
  const { title, description, color, savings } = data;
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
    <VStack
      width="full"
      border={`1px solid ${color}`}
      bgColor={`${color}1A`}
      rounded="16px"
      spacing={8}
      py={3}
      px={4}
    >
      <VStack
        width="full"
        alignItems="flex-start"
        spacing={4}
        justifyContent="space-between"
      >
        <HStack
          width="full"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Text color="black" fontSize="28px" fontWeight={800}>
            {savings}
          </Text>
          <Text color="neutral.600" fontWeight={700}>
            {title}
          </Text>
        </HStack>
        <Text color="neutral.600">{description}</Text>
      </VStack>
      <Button
        customStyles={{ height: '34px' }}
        handleClick={handleApply}
        isLoading={isLoading}
        loadingText="Applying..."
      >
        Apply Recommendations
      </Button>
    </VStack>
  );
};

const Impact = () => {
  const { data, isLoading } = useGetMLRecommendationsSummaryQuery();

  const details: ImpactProps[] = [
    {
      title: 'High Impact',
      description: data?.data?.highImpact?.description,
      color: '#00A129',
      savings: data?.data?.highImpact?.estimatedSavings,
    },
    {
      title: 'Medium Impact',
      description: data?.data?.mediumImpact?.description,
      color: '#0366EF',
      savings: data?.data?.mediumImpact?.estimatedSavings,
    },
    {
      title: 'Quick Win',
      description: data?.data?.quickWin?.description,
      color: '#EABC30',
      savings: data?.data?.quickWin?.estimatedSavings,
    },
  ];

  return (
    <SimpleGrid width="full" columns={{ base: 1, sm: 2, lg: 3 }} gap="16px">
      {isLoading &&
        Array(3)
          .fill('')
          .map((_, index) => (
            <Skeleton key={index} width="full" height="140px" />
          ))}
      {!isLoading &&
        details.map((item, index) => <ImpactCard data={item} key={index} />)}
    </SimpleGrid>
  );
};

export default Impact;
