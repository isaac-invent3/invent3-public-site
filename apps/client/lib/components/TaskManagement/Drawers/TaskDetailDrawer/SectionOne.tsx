import { Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react';

import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { TaskInstance } from '~/lib/interfaces/task.interfaces';

interface SectionOneProps {
  data: TaskInstance;
}
const SectionOne = ({ data }: SectionOneProps) => {
  const info = [
    {
      label: 'Task ID:',
      value: data?.taskInstanceId,
    },
    {
      label: 'Estimated Time:',
      value: data?.estimatedDurationInHours
        ? `${data?.estimatedDurationInHours} ${data?.estimatedDurationInHours > 1 ? 'Hours' : 'Hour'}`
        : 'N/A',
    },
  ];

  return (
    <VStack
      bgColor="#B4BFCA4D"
      pt="24px"
      px={{ base: '24px', md: '42px' }}
      pb="49px"
      spacing="16px"
      width="full"
      alignItems="flex-start"
    >
      <Heading
        color="black"
        lineHeight={{ base: '28.51px', md: '38.02px' }}
        fontSize={{ base: '24px', md: '32px' }}
        fontWeight={{ base: 700, md: 800 }}
      >
        #{data?.taskInstanceId} {data?.taskInstanceName}
      </Heading>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '16px', md: '32px' }}
        alignItems={{ base: 'start', md: 'center' }}
        width="full"
      >
        <VStack alignItems="flex-start" spacing={{ base: '20px', md: '8px' }}>
          {info.map((item, index) => (
            <HStack spacing={{ base: '20px', md: '16px' }} key={index}>
              <Text width="107px" size="md" color="neutral.600">
                {item.label}
              </Text>
              <Text color="black">{item.value}</Text>
            </HStack>
          ))}
        </VStack>

        <VStack alignItems="flex-start" spacing="8px">
          <HStack spacing={{ base: '64px', md: '8px' }}>
            <Text width="62px" size="md" color="neutral.600">
              Status:
            </Text>
            <GenericStatusBox
              text={data?.currentStatus}
              colorCode={data?.statusColorCode}
            />
          </HStack>

          <HStack spacing={{ base: '64px', md: '8px' }}>
            <Text width="62px" size="md" color="neutral.600">
              Priority:
            </Text>
            <GenericStatusBox
              text={data?.priorityName}
              colorCode={data?.priorityColorCode}
            />
          </HStack>
        </VStack>
      </Stack>
    </VStack>
  );
};

export default SectionOne;
