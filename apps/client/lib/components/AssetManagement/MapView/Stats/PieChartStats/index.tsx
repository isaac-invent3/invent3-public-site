import { SimpleGrid, Skeleton } from '@chakra-ui/react';

import PieChartWithInfo from './PieChartWIthInfo';
import { AssetStatsCummalative } from '~/lib/interfaces/asset/stats.interfaces';

interface PieChartStatsProps {
  isLoading: boolean;
  data: AssetStatsCummalative | undefined;
}
const PieChartStats = (props: PieChartStatsProps) => {
  const { isLoading, data: assetInfo } = props;

  const totalAsset = assetInfo?.totalAssets ?? 0;

  const data = [
    {
      label: 'Under Maintenance',
      mainValue: assetInfo?.assetsUnderMaintenance,
      totalValue: totalAsset,
    },
    {
      label: 'Schedule for Maintenance',
      mainValue: assetInfo?.assetsScheduledForMaintenance,
      totalValue: totalAsset,
    },
    {
      label: 'Pending Disposal',
      mainValue: assetInfo?.assetsPendingDisposal,
      totalValue: totalAsset,
    },
    {
      label: 'Out of Service',
      mainValue: assetInfo?.assetsOutOfService,
      totalValue: totalAsset,
    },
  ];

  return (
    <SimpleGrid columns={2} width="full" gap="16px">
      {isLoading
        ? Array(4)
            .fill('')
            .map((_, idx) => <Skeleton width="full" height="45px" key={idx} />)
        : data &&
          data.map((item, index) => <PieChartWithInfo {...item} key={index} />)}
    </SimpleGrid>
  );
};

export default PieChartStats;
