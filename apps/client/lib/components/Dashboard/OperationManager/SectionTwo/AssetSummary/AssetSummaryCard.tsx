import {
  ComponentWithAs,
  Flex,
  IconProps,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';

import { useAppSelector } from '~/lib/redux/hooks';
import SummaryCardWrapper from '../../../../Common/SummaryCardWrapper';

interface AssetSummaryCardProps {
  title: string;
  icon: ComponentWithAs<'svg', IconProps>;
  value: number | undefined;
  children: React.ReactNode;
}

const AssetSummaryCard = (props: AssetSummaryCardProps) => {
  const { title, icon, value, children } = props;
  const { isLoading } = useAppSelector((state) => state.dashboard.info);
  return (
    <SummaryCardWrapper title={title} icon={icon}>
      <VStack
        justifyContent="space-between"
        alignItems="flex-start"
        height="full"
      >
        <Skeleton isLoaded={!isLoading} minW="50px">
          <Text
            mt="8px"
            fontSize="24px"
            lineHeight="28.51px"
            fontWeight={800}
            color="primary.500"
          >
            {value !== undefined ? value.toLocaleString() : '-'}
          </Text>
        </Skeleton>
        <Flex mt="16px">{children}</Flex>
      </VStack>
    </SummaryCardWrapper>
  );
};

export default AssetSummaryCard;
