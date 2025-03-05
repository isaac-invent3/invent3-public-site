import { VStack } from '@chakra-ui/react';

import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import User from '../../Common/User';

const CurrentOwner = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  return (
    <VStack spacing="16px" alignItems="flex-start" width="full">
      <DetailHeader
        variant="secondary"
        customStyles={{ size: { base: 'md', md: 'lg' }, fontWeight: 700 }}
      >
        Current Owner
      </DetailHeader>
      <User
        name={assetData?.currentOwner ?? 'N/A'}
        role="Operation Manager"
        variant="userDetails"
      />
    </VStack>
  );
};

export default CurrentOwner;
