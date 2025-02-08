import { useMediaQuery, VStack } from '@chakra-ui/react';

import DetailHeader from '~/lib/components/UI/DetailHeader';
import User from '../../Common/User';
import { useAppSelector } from '~/lib/redux/hooks';

const CurrentOwner = () => {
  const [isMobile] = useMediaQuery('(max-width: 992px)');
  const assetData = useAppSelector((state) => state.asset.asset);
  if (!assetData) {
    return null;
  }
  const { currentOwner, departmentName, buildingName, floorName } = assetData;
  return (
    <VStack spacing="16px" alignItems="flex-start" width="full">
      <DetailHeader
        variant="secondary"
        customStyles={{ size: 'lg', fontWeight: 700 }}
      >
        Current Owner
      </DetailHeader>
      <User
        minWidth={isMobile ? '100px' : '120px'}
        name={currentOwner}
        department={departmentName}
        location={[buildingName, floorName].filter(Boolean).join(', ')}
        role={'Operation Manager'}
      />
    </VStack>
  );
};

export default CurrentOwner;
