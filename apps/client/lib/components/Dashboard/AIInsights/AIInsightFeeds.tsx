import { HStack, Icon, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../Common/CardHeader';
import {
  useApplyAnMLInsightMutation,
  useGetAIInsightFeedQuery,
} from '~/lib/redux/services/dashboard/ai';
import { MLInsightFeed } from '~/lib/interfaces/dashboard/aiinsights.interfaces';
import { FeedIcon } from '../../CustomIcons/Dashboard';
import { Button, EmptyState } from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';

const Feed = ({ data }: { data: MLInsightFeed }) => {
  const { title, description, confidence, timestamp } = data;
  const { handleSubmit } = useCustomMutation();
  const [applyFeed, { isLoading }] = useApplyAnMLInsightMutation();

  const handleApply = async () => {
    await handleSubmit(applyFeed, { id: 1 }, 'Feed Applied Successfully');
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
      <HStack spacing={4} alignItems="flex-start">
        <Icon as={FeedIcon} boxSize="24px" />
        <VStack spacing={1} alignItems="flex-start">
          <HStack spacing={2} alignItems="flex-end">
            <Text color="black" fontWeight={700} size="md">
              {title}
            </Text>
            <Text color="neutral.600" fontSize="10px">
              {timestamp}
            </Text>
          </HStack>
          <Text color="neutral.600" size="md" fontWeight={400}>
            {description}
          </Text>
          <Text color="neutral.600" fontWeight={400}>
            Confidence:{' '}
            <Text
              fontWeight={800}
              as="span"
              color={confidence > 0.5 ? '#00A129' : '#F50000'}
            >
              {confidence * 100}%
            </Text>
          </Text>
        </VStack>
      </HStack>
      <Button
        customStyles={{ width: '153px', height: '46px', className: 'no-pdf' }}
        handleClick={handleApply}
        isLoading={isLoading}
        loadingText="Applying..."
      >
        Apply
      </Button>
    </HStack>
  );
};

const AIInsightFeeds = () => {
  const { data, isLoading } = useGetAIInsightFeedQuery();
  return (
    <VStack
      width="full"
      height="min-content"
      py={6}
      px={4}
      alignItems="flex-start"
      spacing="22px"
      bgColor="white"
      rounded="8px"
    >
      <CardHeader>AI Insight Feed</CardHeader>
      {isLoading && (
        <VStack width="full" spacing={2}>
          {Array(4)
            .fill('')
            .map((_, index) => (
              <Skeleton width="full" key={index} height="80px" rounded="6px" />
            ))}
        </VStack>
      )}
      {!isLoading && data?.data && data?.data?.length > 0 && (
        <VStack width="full" spacing={2}>
          {data?.data?.map((item, index) => (
            <Feed data={item} key={index} />
          ))}
        </VStack>
      )}
      {!isLoading && data?.data?.length === 0 && <EmptyState />}
    </VStack>
  );
};

export default AIInsightFeeds;
