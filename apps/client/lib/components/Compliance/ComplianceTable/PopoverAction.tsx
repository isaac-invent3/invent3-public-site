/* eslint-disable no-unused-vars */
import { Text, VStack } from '@chakra-ui/react';
import { GenericPopover } from '@repo/ui/components';
import Link from 'next/link';
import { ROUTES } from '~/lib/utils/constants';

const PopoverAction = ({ facilityId }: { facilityId: number }) => {
  return (
    <>
      <GenericPopover width="137px" placement="bottom-start">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Link href={`/${ROUTES.COMPLIANCE}/facility/${facilityId}`}>
            <Text cursor="pointer">View Details</Text>
          </Link>
        </VStack>
      </GenericPopover>
    </>
  );
};

export default PopoverAction;
