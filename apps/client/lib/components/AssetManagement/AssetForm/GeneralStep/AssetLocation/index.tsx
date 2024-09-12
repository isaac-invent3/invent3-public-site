import { Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import SectionInfo from '../../SectionInfo';
import AddButton from '../../AddButton';
import LocationModal from './Modals/LocationModal';

const AssetLocation = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <HStack
      width="full"
      alignItems="center"
      spacing="104px"
      position="relative"
    >
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Location"
          info="Specify where the asset is located"
          isRequired
        />
      </Flex>
      <VStack>
        <AddButton handleClick={onOpen}>Add Location</AddButton>
      </VStack>
      <LocationModal isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
};

export default AssetLocation;
