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
      <HStack spacing="8px">
        <Button
          customStyles={{ height: '35px', px: '12px' }}
          handleClick={handleBack}
        >
          Edit Vendor Details
        </Button>
        <Button
          customStyles={{ height: '35px', px: '12px' }}
          handleClick={handleBack}
          variant="outline"
        >
          Send Reminder Email
        </Button>
        <Button
          customStyles={{ height: '35px', px: '12px' }}
          handleClick={handleBack}
          variant="secondary"
        >
          Terminate Contract
        </Button>
      </HStack>
    </HStack>
  );
};

export default VendorHeader;
