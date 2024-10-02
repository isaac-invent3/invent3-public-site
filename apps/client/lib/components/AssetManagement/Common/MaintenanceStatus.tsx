import { Text } from '@chakra-ui/react';
import { MaintenanceColorCode } from '~/lib/utils/ColorCodes';

const Status = (status: string) => {
  return (
    <Text
      color={MaintenanceColorCode[status as 'Completed']}
      textTransform="capitalize"
    >
      {status}
    </Text>
  );
};

export default Status;
