import { Box, HStack, Text, VStack, Skeleton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useGetTicketAuditTrailByIdQuery } from '~/lib/redux/services/ticket.services';

interface TimelineData {
  title: string;
  description?: string;
  color: string;
  textColor: string;
  action?: () => void;
}

interface TimelineViewProps {
  index: number;
  itemsLength: number;
  data: TimelineData;
}

const TimelineSkeleton = () => {
  const afterClass = {
    content: '""',
    width: '0px',
    height: '100%',
    border: '1px dashed #656565',
    position: 'absolute',
    top: '70%',
    left: '0.9rem',
    zIndex: -1,
  };

  return (
    <VStack align="stretch" spacing={5}>
      {[1, 2, 3].map((_, index) => (
        <HStack
          key={index}
          position="relative"
          alignItems="center"
          gap={3}
          minHeight="40px"
          _after={index < 2 ? afterClass : undefined}
        >
          {/* Circle Skeleton */}
          <Skeleton boxSize={8} rounded="full" />

          <VStack gap={1} alignItems="start" flex={1}>
            {/* Title Skeleton */}
            <Skeleton height="14px" width="120px" />
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
};

const TimelineView = ({ data, index, itemsLength }: TimelineViewProps) => {
  const afterClass = {
    content: '""',
    width: '0px',
    height: '100%',
    border: '1px dashed #656565',
    position: 'absolute',
    top: '50%',
    left: '0.9rem',
    zIndex: -1,
  };
  return (
    <HStack
      position="relative"
      alignItems="center"
      gap={3}
      minHeight="40px"
      mb={5}
      _after={index < itemsLength - 1 ? afterClass : undefined}
    >
      <Box boxSize={8} rounded="full" bgColor={data?.color} />

      <VStack gap={1} alignItems={'start'}>
        <Text
          color={data?.textColor ?? 'black'}
          cursor={data?.action ? 'pointer' : 'initial'}
          onClick={() => {
            data?.action && data?.action();
          }}
        >
          {data?.title ?? 'N/A'}
        </Text>

        <Text color="#656565" fontSize="11px" fontWeight={500}>
          {data?.description}
        </Text>
      </VStack>
    </HStack>
  );
};

const TicketActivity = ({ ticketId }: { ticketId: number }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetTicketAuditTrailByIdQuery({
    ticketId,
    pageNumber: pageNumber,
    pageSize: 3,
  });
  const [timelines, setTimelines] = useState<TimelineData[]>([]);

  useEffect(() => {
    if (data?.data?.items) {
      let activeTimelineView: TimelineData[] = [];
      data?.data?.items.map((item, index) =>
        activeTimelineView.push({
          title: item.message,
          color: '#C4C4C4',
          textColor: 'black',
        })
      );
      setTimelines((prev) => [...prev, ...activeTimelineView]);
    }
  }, [data]);

  const finalTimelines = [
    ...timelines,
    ...(data?.data?.hasNextPage
      ? [
          {
            title: isFetching ? 'Loading...' : 'View More Activity',
            color: '#0366EF',
            textColor: '#0366EF',
            action: () => {
              setPageNumber((prev) => prev + 1);
            },
          },
        ]
      : []),
  ];

  return (
    <VStack width="full" alignItems="flex-start" pt="0px">
      <Text color="neutral.600" fontWeight={700}>
        Ticket Activity
      </Text>

      <Box width="full">
        {isLoading && <TimelineSkeleton />}
        {!isLoading &&
          finalTimelines.length > 0 &&
          finalTimelines.map((timeline, index) => (
            <TimelineView
              data={timeline}
              index={index}
              itemsLength={finalTimelines.length}
              key={index}
            />
          ))}
        {!isLoading && finalTimelines?.length === 0 && (
          <Text
            width="full"
            my={10}
            textAlign="center"
            color="neutral.600"
            fontStyle="italic"
            size="md"
          >
            No Ticket Activity
          </Text>
        )}
      </Box>
    </VStack>
  );
};

export default TicketActivity;
