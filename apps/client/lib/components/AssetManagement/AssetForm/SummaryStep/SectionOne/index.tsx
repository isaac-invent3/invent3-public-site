import { Flex } from '@chakra-ui/react';
import React from 'react';
import Images from './Images';
import Description from './Description';
import { AssetFormDetails } from '~/lib/interfaces/asset.interfaces';
import Documents from './Documents';

interface SectionOneProps {
  assetFormDetails: AssetFormDetails;
}
const SectionOne = ({ assetFormDetails }: SectionOneProps) => {
  return (
    <Flex width="full" gap="24px">
      <Flex width="36.8%">
        <Images images={assetFormDetails.images} />
      </Flex>
      <Flex width="43.9%">
        <Description description={assetFormDetails.description} />
      </Flex>
      <Flex width="19.2%">
        <Documents documents={assetFormDetails.documents} />
      </Flex>
    </Flex>
  );
};

export default SectionOne;
