import { HStack, Icon, Skeleton, Text, VStack } from '@chakra-ui/react';

import { DowntrendIcon, UptrendIcon } from '~/lib/components/CustomIcons';

interface InfoProps {
  title: string;
  valueChange: number;
  days: number;
  isLoading: boolean;
}
const Info = (props: InfoProps) => {
  const { title, valueChange, days, isLoading } = props;
  return (
    <VStack spacing="4px" alignItems="flex-start" width="full">
      <Text color="neutral.300" fontWeight={700}>
        {title}
      </Text>
      <VStack spacing={0} alignItems="flex-start" width="full">
        <Skeleton isLoaded={!isLoading}>
          <HStack spacing="4px">
            <Text
              color="neutral.200"
              fontWeight={800}
              fontSize="24px"
              lineHeight="28.51px"
            >
              {days}
            </Text>
            <Text
              color="neutral.200"
              fontWeight={800}
              fontSize="10px"
              lineHeight="14px"
            >
              {`DAY${days > 1 ? 'S' : ''}`}
            </Text>
          </HStack>
        </Skeleton>

        <HStack spacing="8px">
          <Icon
            as={valueChange < 0 ? DowntrendIcon : UptrendIcon}
            boxSize="18px"
            color={valueChange < 0 ? '#BA0000' : '#6CF892'}
          />
          <Text color={valueChange < 0 ? '#BA0000' : '#6CF892'}>
            {valueChange < 0 && '-'}
            {valueChange > 0 && '+'}
            {valueChange < 0 ? valueChange * -1 : valueChange}%
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Info;
