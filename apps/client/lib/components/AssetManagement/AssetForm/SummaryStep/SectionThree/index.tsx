import { Flex } from '@chakra-ui/react';
import React from 'react';
import Description from '../SectionOne/Description';
import DocumentSummaryView from '~/lib/components/Common/DocumentUploadAndView/DocumentSummaryView';
import { useAppSelector } from '~/lib/redux/hooks';

const SectionThree = () => {
  const { documents } = useAppSelector((state) => state.asset.assetForm);
  return (
    <Flex
      width="full"
      gap={{ base: '32px', lg: '16px' }}
      direction={{ base: 'column', lg: 'row' }}
    >
      <Flex
        width={{ base: 'full', lg: '53%' }}
        bgColor="#F5F5F5"
        p="16px"
        rounded="16px"
      >
        <Description />
      </Flex>
      <Flex
        width={{ base: 'full', lg: '48%' }}
        bgColor="#F5F5F5"
        p="16px"
        rounded="16px"
      >
        <DocumentSummaryView documents={documents} />
      </Flex>
    </Flex>
  );
};

export default SectionThree;
