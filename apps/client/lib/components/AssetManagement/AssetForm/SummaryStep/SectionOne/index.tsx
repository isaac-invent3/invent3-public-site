import { Flex } from '@chakra-ui/react';

import Images from './Images';
import Description from './Description';
import { useAppSelector } from '~/lib/redux/hooks';
import DocumentSummaryView from '~/lib/components/Common/DocumentUploadAndView/DocumentSummaryView';

const SectionOne = () => {
  const { documents } = useAppSelector((state) => state.asset.assetForm);
  return (
    <Flex
      width="full"
      gap={{ base: '32px', lg: '24px' }}
      direction={{ base: 'column', lg: 'row' }}
    >
      <Flex width={{ base: 'full', lg: '36.8%' }}>
        <Images />
      </Flex>
      <Flex width={{ base: 'full', lg: '43.9%' }}>
        <Description />
      </Flex>
      <Flex width={{ base: 'full', lg: '19.2%' }}>
        <DocumentSummaryView documents={documents} />
      </Flex>
    </Flex>
  );
};

export default SectionOne;
