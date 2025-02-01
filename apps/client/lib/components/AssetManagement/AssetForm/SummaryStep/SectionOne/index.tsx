import { Flex } from '@chakra-ui/react';

import Images from './Images';
import Description from './Description';
import { useAppSelector } from '~/lib/redux/hooks';
import DocumentSummaryView from '~/lib/components/Common/DocumentUploadAndView/DocumentSummaryView';

const SectionOne = () => {
  const { documents } = useAppSelector((state) => state.asset.assetForm);
  return (
    <Flex width="full" gap="24px">
      <Flex width="36.8%">
        <Images />
      </Flex>
      <Flex width="43.9%">
        <Description />
      </Flex>
      <Flex width="19.2%">
        <DocumentSummaryView documents={documents} />
      </Flex>
    </Flex>
  );
};

export default SectionOne;
