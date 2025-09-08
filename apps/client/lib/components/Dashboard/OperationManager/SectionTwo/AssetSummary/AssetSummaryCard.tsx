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
    <SummaryCardWrapper
      title={title}
      icon={icon}
      headerStyle={{ fontWeight: 500 }}
      count={value}
      isLoading={isLoading}
    >
      <Flex mt="16px">{children}</Flex>
    </SummaryCardWrapper>
  );
};

export default AssetSummaryCard;
