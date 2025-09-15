import { SimpleGrid } from '@chakra-ui/react';
import InfoOne from './InfoOne';
import AssetMap from './AssetMap';

const GeneralTab = () => {
  return (
    <SimpleGrid
      width="full"
      spacing="16px"
      my="24px"
      bgColor="white"
      p={{ base: '8px', lg: '16px' }}
      rounded="8px"
      columns={{ base: 1, lg: 2 }}
    >
      <InfoOne />
      <AssetMap />
    </SimpleGrid>
  );
};

export default GeneralTab;
