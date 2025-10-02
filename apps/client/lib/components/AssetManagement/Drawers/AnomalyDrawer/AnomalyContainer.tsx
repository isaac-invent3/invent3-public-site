import {
  Collapse,
  HStack,
  Icon,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BMSAnomaly } from '~/lib/interfaces/dashboard/bms.interfaces';
import Summary from './Summary';
import AnomalyDetail from './AnomalyDetails';
import RecommendedAction from './RecommendedAction';
import { Button } from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useAcknowledgeAnomalyMutation,
  useCreateTicketFromAnomalyMutation,
  useDismissAnomalyMutation,
} from '~/lib/redux/services/bms/bmsAnomalies.services';
import { getSession } from 'next-auth/react';

interface AnomalyContainerProps {
  anomaly?: BMSAnomaly;
  isOpen: boolean;
  onToggle: () => void;
}
const AnomalyContainer = ({
  anomaly,
  isOpen,
  onToggle,
}: AnomalyContainerProps) => {
  const { asset } = useAppSelector((state) => state.asset);
  const { handleSubmit } = useCustomMutation();
  const [acknowledgeAnomaly, { isLoading: isAcknowledging }] =
    useAcknowledgeAnomalyMutation({});
  const [dismissAnomaly, { isLoading: isDismissing }] =
    useDismissAnomalyMutation({});
  const [createTicket, { isLoading: isCreating }] =
    useCreateTicketFromAnomalyMutation({});

  const handleDismiss = async () => {
    const session = await getSession();
    await handleSubmit(
      dismissAnomaly,
      {
        anomalyId: anomaly?.anomalyId!,
        dismissedBy: session?.user?.username!,
      },
      'Anomaly Dismissed Successfully'
    );
    // onClose();
  };

  const handleAcknowledge = async () => {
    const session = await getSession();
    await handleSubmit(
      acknowledgeAnomaly,
      {
        anomalyId: anomaly?.anomalyId!,
        acknowledgedBy: session?.user?.username!,
      },
      'Anomaly Acknowledged Successfully'
    );
    // onClose();
  };

  const handleCreateTicket = async () => {
    await handleSubmit(
      createTicket,
      {
        anomalyId: anomaly?.anomalyId!,
      },
      'Ticket Created Successfully'
    );
    // onClose();
  };

  return (
    <VStack width="full" spacing={0}>
      <HStack
        width="full"
        py="12px"
        px="24px"
        justifyContent="space-between"
        bgColor="neutral.100"
        cursor="pointer"
        onClick={onToggle}
      >
        <Text color="black" size="md" lineHeight="100%">
          Test
        </Text>
        <Icon
          as={ChevronDownIcon}
          boxSize="16px"
          color="neutral.800"
          transition="transform 0.3s ease-out"
          transform={isOpen ? 'rotate(-180deg)' : 'rotate(0deg)'}
          cursor="pointer"
        />
      </HStack>
      <Collapse
        startingHeight={0}
        in={isOpen}
        transition={{ enter: { duration: 0 } }}
        style={{ width: '100%' }}
      >
        <VStack width="full" alignItems="flex-start" spacing="24px" pb="32px">
          <VStack
            width="full"
            px={{ base: '24px' }}
            py="16px"
            bgColor="#F500001A"
            alignItems="flex-start"
            spacing="8px"
          >
            <HStack spacing="25px">
              <Text size="xl" lineHeight="100%" fontWeight={700} color="black">
                <Text
                  fontWeight={700}
                  size="xl"
                  lineHeight="100%"
                  as="span"
                  color="#F50000"
                >
                  Anomaly Detected:{' '}
                </Text>
                {asset?.assetName}
              </Text>
            </HStack>
            <Text color="neutral.600" size="md">
              Real-time anomaly detected in sensor readings
            </Text>
          </VStack>
          <VStack
            px={{ base: '24px' }}
            width="full"
            divider={<StackDivider borderColor="#BBBBBB" />}
            spacing="24px"
          >
            <Summary anomaly={anomaly} />
            <AnomalyDetail anomaly={anomaly} />
            <RecommendedAction suggestions={[]} />
          </VStack>
          <HStack
            width="full"
            px={{ base: '24px' }}
            justifyContent="center"
            spacing="8px"
          >
            {!anomaly?.isDismissed && !anomaly?.hasTicket && (
              <Button
                variant="secondary"
                customStyles={{ width: '75px' }}
                handleClick={handleDismiss}
                isLoading={isDismissing}
                loadingText="Dismissing..."
              >
                Dismiss
              </Button>
            )}
            {!anomaly?.isAcknowledged && !anomaly?.hasTicket && (
              <Button
                variant="secondary"
                customStyles={{ width: '161px' }}
                handleClick={handleAcknowledge}
                isLoading={isAcknowledging}
                loadingText="Acknowledging..."
              >
                Acknowledge Anomally
              </Button>
            )}
            {!anomaly?.hasTicket && (
              <Button
                customStyles={{ width: '132px' }}
                handleClick={handleCreateTicket}
                isLoading={isCreating}
                loadingText="Creating..."
              >
                Create Ticket
              </Button>
            )}
          </HStack>
        </VStack>
      </Collapse>
    </VStack>
  );
};

export default AnomalyContainer;
