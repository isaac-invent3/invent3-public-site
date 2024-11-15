import { Box, HStack, Text, VStack } from '@chakra-ui/react';

const timelines = [
  { title: 'Ticket created', description: '23/10/2024', color: '#C4C4C4' },

  {
    title: (
      <p>
        <strong>George Clooney</strong> Created a schedule for the ticket
      </p>
    ),
    description: '23/10/2024',
    color: '#FF7A37',
  },
  {
    title: (
      <p>
        <strong>George Clooney</strong> assigned the ticket to{' '}
        <strong>George Clooney</strong>
      </p>
    ),
    description: '23/10/2024',
    color: '#7DAEF2',
  },
  {
    title: <strong>View more activity</strong>,
    color: '#C4C4C4',
  },
];

const TicketActivity = () => {
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
    <VStack width="full" alignItems="flex-start" pt="24px" px="24px">
      <Text color="neutral.600" fontWeight={700}>
        Ticket Activity
      </Text>

      <Box maxHeight="400px">
        {timelines.map((timeline, index) => (
          <HStack
            position="relative"
            alignItems="center"
            gap={3}
            minHeight="40px"
            mb={5}
            _after={index < timelines.length - 1 ? afterClass : undefined}
          >
            <Box boxSize={8} rounded="full" bgColor={timeline.color} />

            <VStack gap={1} alignItems={'start'}>
              <Text>{timeline.title}</Text>

              <Text color="#656565" fontSize="11px" fontWeight={500}>
                {timeline.description}
              </Text>
            </VStack>
          </HStack>
        ))}
      </Box>
    </VStack>
  );
};

export default TicketActivity;
