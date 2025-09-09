import { HStack, Icon, Skeleton, Text, VStack } from '@chakra-ui/react';
import { FacilityMapIcon } from '~/lib/components/CustomIcons';

interface SummaryCardProps {
  isLoading: boolean;
  count: number;
  stateName?: string;
}

const SummaryCard = (props: SummaryCardProps) => {
  const { count, stateName, isLoading } = props;

  return (
    <VStack
      width="full"
      alignItems="flex-start"
      bgColor="white"
      py="12px"
      px="8px"
      rounded="8px"
      spacing="8px"
    >
      <HStack spacing="6px">
        <Icon as={FacilityMapIcon} boxSize="21px" color="#00A129" />
        <Text color="neutral.600" width="full" size="md" lineHeight="100%">
          Total Facility {stateName ? `in ${stateName}` : ''}
        </Text>
      </HStack>
      <Skeleton isLoaded={!isLoading}>
        <HStack spacing="5px" alignItems="flex-end">
          <Text
            color="primary.500"
            fontSize="24px"
            lineHeight="100%"
            fontWeight={700}
          >
            {count ? count?.toLocaleString() : 0}
          </Text>
        </HStack>
      </Skeleton>
    </VStack>
  );
};

export default SummaryCard;
