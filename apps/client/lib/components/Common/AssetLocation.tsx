import { Flex, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';

interface AssetLocationProps {
  value: string | null;
}
const AssetLocation = (props: AssetLocationProps) => {
  const { value } = props;

  return (
    <HStack width="full" alignItems="flex-start" spacing="56px">
      <Flex width="full" maxW="130px">
        <SectionInfo
          title="Asset Location"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Text
        color="black"
        bgColor="neutral.100"
        minH="96px"
        width="full"
        rounded="8px"
        py="8px"
        px="11px"
      >
        {value}
      </Text>
    </HStack>
  );
};

export default AssetLocation;
