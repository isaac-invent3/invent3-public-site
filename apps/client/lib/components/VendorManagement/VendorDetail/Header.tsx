import { HStack, Icon } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import { CloseIcon } from '../../CustomIcons';

interface VendorHeaderProps {
  handleBack: () => void;
}
const VendorHeader = (props: VendorHeaderProps) => {
  const { handleBack } = props;

  return (
    <HStack width="full" justifyContent="space-between">
      <HStack spacing="16px">
        <Button
          customStyles={{ height: '32px', px: '12px' }}
          variant="secondary"
          handleClick={handleBack}
        >
          <Icon as={CloseIcon} boxSize="16px" color="primary.500" mr="8px" />
          Back
        </Button>
      </HStack>
    </HStack>
  );
};

export default VendorHeader;
