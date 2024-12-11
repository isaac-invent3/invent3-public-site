import { VStack } from '@chakra-ui/react';

import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import User from '../../Common/User';

const CurrentOwner = () => {
  const { currentOwner } = useAppSelector((state) => state.asset.asset);
  return (
    <VStack spacing="16px" alignItems="flex-start" width="full">
      <DetailHeader variant="secondary">Current Owner</DetailHeader>
      <User
        name={currentOwner}
        role="Operation Manager"
        variant="userDetails"
      />
    </VStack>
  );
};

export default CurrentOwner;
