import {
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { MaintenanceScheduleInstance } from '~/lib/interfaces/maintenance.interfaces';
import HeaderInfo from './HeaderInfo';
import OtherInfo from './OtherInfo';
import PlanDetail from './PlanDetail';
import ModalButtons from './ModalButtons';
import { CloseIcon } from '~/lib/components/CustomIcons';

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: MaintenanceScheduleInstance;
}
const EventDetailModal = (props: EventDetailModalProps) => {
  const { isOpen, onClose, data } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        minW={{ base: '90%', lg: '729px' }}
        maxHeight="90%"
        rounded="4px"
      >
        <ModalBody p={0} m={0} position="relative">
          <Icon
            as={CloseIcon}
            boxSize="24px"
            position="absolute"
            mt="16px"
            mr="16px"
            right={0}
            color="primary.500"
            cursor="pointer"
            onClick={() => onClose()}
          />
          <VStack
            width="full"
            spacing="40px"
            bgColor="#0366EF14"
            alignItems="flex-start"
            pt="16px"
            px="16px"
            pb="20px"
          >
            <HeaderInfo data={data} />
            <OtherInfo data={data} />
          </VStack>
          <VStack
            width="full"
            alignItems="flex-start"
            spacing="68px"
            mt="28px"
            px="16px"
            pb="26px"
          >
            <PlanDetail data={data} />
            <ModalButtons
              planId={data?.maintenancePlanId}
              scheduleInstanceGuid={data?.scheduleInstanceGuid}
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EventDetailModal;
