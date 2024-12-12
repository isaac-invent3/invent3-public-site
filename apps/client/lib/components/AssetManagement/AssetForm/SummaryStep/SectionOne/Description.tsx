import { Text, VStack } from '@chakra-ui/react';

import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';

const Description = () => {
  const { description } = useAppSelector((state) => state.asset.assetForm);
  return (
    <VStack spacing="8px" width="full" alignItems="flex-start">
      <DetailHeader variant="primary">Description</DetailHeader>
      <Text
        fontWeight={500}
        pt="8px"
        pb="12px"
        pl="11px"
        pr="15px"
        rounded="8px"
        bgColor="#F0F0F0"
        color="neutral.700"
        width="full"
        minH="86px"
      >
        {description}
      </Text>
    </VStack>
  );
};

export default Description;
