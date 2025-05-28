import { DrawerBody, DrawerHeader, Stack } from '@chakra-ui/react';
import { BackButton, GenericDrawer, LoadingSpinner } from '@repo/ui/components';
import React from 'react';
import GenericErrorState from '../../UI/GenericErrorState';

interface LoadingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isError: boolean;
  isLoading: boolean;
}
const LoadingDrawer = (props: LoadingDrawerProps) => {
  const { isOpen, onClose, isLoading, isError } = props;
  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="507px">
      <DrawerHeader p={0} m={0}>
        <Stack
          pt="16px"
          pb="32px"
          px={{ base: '16px', lg: '24px' }}
          width="full"
          justifyContent="space-between"
          direction={{ base: 'row' }}
        >
          <BackButton handleClick={onClose} />
        </Stack>
      </DrawerHeader>
      {isLoading && (
        <DrawerBody width="full" height="full">
          <LoadingSpinner />
        </DrawerBody>
      )}

      {!isLoading && isError && (
        <DrawerBody width="full" height="full">
          <GenericErrorState subtitle="Invalid Ticket" />
        </DrawerBody>
      )}
    </GenericDrawer>
  );
};

export default LoadingDrawer;
