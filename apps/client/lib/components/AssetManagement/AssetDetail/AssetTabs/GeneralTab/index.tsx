import { VStack } from '@chakra-ui/react';
import InfoOne from './InfoOne';
import InfoTwo from './InfoTwo.tsx';

const GeneralTab = () => {
  return (
    <VStack width="full" spacing="30px" my="24px">
      <InfoOne />
      <InfoTwo />
    </VStack>
  );
};

export default GeneralTab;
