import { HStack, Text, VStack } from '@chakra-ui/react';

import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';

interface HeaderInfoProps {
  data: MaintenanceSchedule;
  type?: 'primary' | 'secondary';
}

const HeaderInfo = (props: HeaderInfoProps) => {
  const { data, type = 'primary' } = props;
  const isPrimary = type === 'primary';
  const textColor = isPrimary ? 'white' : 'black';

  const firstInfo = [
    {
      label: 'Asset Name',
      value: `${data?.assetId} - ${data?.assetName}`,
    },
    {
      label: 'Location',
      value: data?.assetLocation ?? 'N/A',
    },
  ];

  return (
    <HStack
      width="full"
      bgColor={isPrimary ? 'primary.500' : 'none'}
      p={isPrimary ? '16px' : '0px'}
      roundedTop="8px"
      alignItems="flex-start"
      justifyContent="space-between"
      flexWrap="wrap"
      spacing={{ base: '24px', md: '40px' }}
    >
      <HStack
        spacing={{ base: '24px', md: '40px' }}
        alignItems="flex-start"
        flexWrap="wrap"
      >
        {firstInfo.map((item, index) => (
          <VStack alignItems="flex-start" spacing="8px" key={index}>
            <Text color="neutral.300">{item.label}</Text>
            <Text
              color={textColor}
              fontSize="14px"
              lineHeight="22px"
              maxW="350px"
            >
              {item.value}
            </Text>
          </VStack>
        ))}
      </HStack>
      <VStack alignItems="flex-start" spacing="4px">
        <Text color="neutral.300">Maintenance Plan</Text>
        <HStack spacing="8px">
          <Text
            color={textColor}
            fontSize="14px"
            lineHeight="22px"
            maxW="278px"
          >
            {data?.planName}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default HeaderInfo;
