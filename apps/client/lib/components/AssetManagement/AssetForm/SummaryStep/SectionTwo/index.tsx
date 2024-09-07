import { Flex } from '@chakra-ui/react';
import React from 'react';
import { AssetFormDetails } from '~/lib/interfaces/asset.interfaces';
import General from './General';
import Acquisition from './Acquisition';
interface SectionTwoProps {
  assetFormDetails: AssetFormDetails;
}
const SectionTwo = ({ assetFormDetails }: SectionTwoProps) => {
  return (
    <Flex width="full" gap="24px">
      <Flex width="36.8%">
        <General assetFormDetails={assetFormDetails} />
      </Flex>
      <Flex width="43.9%">
        <Acquisition assetFormDetails={assetFormDetails} />
      </Flex>
    </Flex>
  );
};

export default SectionTwo;
