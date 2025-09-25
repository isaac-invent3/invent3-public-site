import { Flex, ModalBody, ModalHeader } from '@chakra-ui/react';
import { GenericModal } from '@repo/ui/components';
import React, { useState } from 'react';
import PageHeader from '~/lib/components/UI/PageHeader';
import VendorInfo from '~/lib/components/VendorManagement/VendorForm/VendorInfo';

interface VendorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
const VendorDrawer = (props: VendorDrawerProps) => {
  const { isOpen, onClose } = props;
  const [activeStep, setActiveStep] = useState(1);
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ maxW: '90vw', width: '1116px', height: { lg: '716px' } }}
      mainModalStyle={{ blockScrollOnMount: false, preserveScrollBarGap: true }}
    >
      <ModalHeader p={0} mt="24px" px="24px" pb="16px">
        <PageHeader>Add New Vendor</PageHeader>
      </ModalHeader>
      <ModalBody m={0} p={0} px="24px">
        <Flex
          width="full"
          direction="column"
          p={0}
          pb="24px"
          pt="44px"
          gap="44px"
        >
          <VendorInfo
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            type="create"
            cancelAction={onClose}
          />
        </Flex>
      </ModalBody>
    </GenericModal>
  );
};

export default VendorDrawer;
