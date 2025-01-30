import { HStack, Icon } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import { CloseIcon } from '../../CustomIcons';

interface LogHeaderProps {
  handleBack: () => void;
}
const LogHeader = (props: LogHeaderProps) => {
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

      <HStack width="min-content" spacing="8px">
        <Button
          customStyles={{ height: '35px', width: '131px', px: '44px' }}
          variant="primary"
        >
          Export
        </Button>
        <Button
          customStyles={{ height: '35px', width: '131px', px: '44px' }}
          variant="secondary"
        >
          Flag for Review
        </Button>
      </HStack>
    </HStack>
  );
};

export default LogHeader;
