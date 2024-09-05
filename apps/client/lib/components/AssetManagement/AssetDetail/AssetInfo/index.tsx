import { Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import { Asset } from '~/lib/interfaces/asset.interfaces';
import Overview from './Overview';
import Summary from './Summary';

interface AssetInfoProps {
  data: Asset;
}
const AssetInfo = (props: AssetInfoProps) => {
  const { data } = props;
  return (
    <VStack width="full" spacing="24px">
      <Overview data={data} />
      <Flex width="full" px="32px">
        <Summary data={data} />
      </Flex>
    </VStack>
  );
};

export default AssetInfo;
