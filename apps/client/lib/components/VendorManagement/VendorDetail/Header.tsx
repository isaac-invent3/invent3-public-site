import { Grid, HStack, Icon, Stack } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import { CloseIcon } from '../../CustomIcons';

interface VendorHeaderProps {
  handleBack: () => void;
}
const VendorHeader = (props: VendorHeaderProps) => {
  const { handleBack } = props;

  return (
    <Stack
      flexDir={{ base: 'column', md: 'row' }}
      width="full"
      justifyContent="space-between"
    >
      <HStack spacing="16px">
        <Button
          customStyles={{ height: '32px', px: '12px', width: '85px' }}
          variant="secondary"
          handleClick={handleBack}
        >
          <Icon as={CloseIcon} boxSize="16px" color="primary.500" mr="8px" />
          Back
        </Button>
      </HStack>
      <Grid
        gap="8px"
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      >
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
          customStyles={{
            height: '35px',
            px: '12px',
            display: { base: 'none', md: 'flex' },
          }}
          handleClick={handleBack}
          variant="secondary"
        >
          Terminate Contract
        </Button>
      </Grid>
    </Stack>
  );
};

export default VendorHeader;
