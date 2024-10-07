import { HStack, Icon, Skeleton, Text, VStack } from '@chakra-ui/react';
import { AssetIcon } from '~/lib/components/CustomIcons';
import { InfoProps } from '~/lib/interfaces/asset.interfaces';
import { formatNumberShort } from '~/lib/utils/helperFunctions';

interface SummaryCardProps {
  isLoading: boolean;
  info: InfoProps;
}

const SummaryCard = (props: SummaryCardProps) => {
  const { info, isLoading } = props;
  const { iconColor, label, value, suffix, shorten, textColor } = info;

  return (
    <VStack width="full" alignItems="flex-start">
      <HStack spacing="4px">
        <Icon as={AssetIcon} boxSize="21px" color={iconColor} />
        <Text
          color={textColor}
          width="full"
          fontSize="10px"
          lineHeight="11.88px"
        >
          {label}
        </Text>
      </HStack>
      <Skeleton isLoaded={!isLoading}>
        <HStack spacing="5px" alignItems="flex-end">
          <Text
            color="primary.500"
            fontSize="24px"
            lineHeight="28.51px"
            fontWeight={700}
          >
            {value
              ? shorten
                ? formatNumberShort(value)
                : value.toLocaleString()
              : '-'}
          </Text>
          {suffix && (
            <Text
              color="primary.accent"
              fontWeight={700}
              fontSize="10px"
              lineHeight="11.88px"
              mb="4px"
            >
              {suffix}
            </Text>
          )}
        </HStack>
      </Skeleton>
    </VStack>
  );
};

export default SummaryCard;
