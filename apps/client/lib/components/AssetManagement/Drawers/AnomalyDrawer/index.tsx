import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  HStack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BackButton, Button, GenericDrawer } from '@repo/ui/components';
import React, { useMemo } from 'react';
import { Prediction } from '~/lib/interfaces/prediction.interfaces';
import {
  useAcknowledgePredictionsMutation,
  useGenerateWorkOrderFromPredictionMutation,
  useGetAlertPredictionsByAlertIdQuery,
} from '~/lib/redux/services/prediction.services';
import moment from 'moment';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import Summary from './Summary';
import RecommendedAction from './RecommendedAction';
import AnomalyDetail from './AnomalyDetails';

interface AnomalyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  predictiveAlertId?: number;
  prediction?: Prediction;
}

const AnomalyDrawer = (props: AnomalyDrawerProps) => {
  const { isOpen, onClose, predictiveAlertId, prediction } = props;
  const { data, isLoading } = useGetAlertPredictionsByAlertIdQuery(
    { alertId: predictiveAlertId! },
    { skip: prediction !== undefined || !predictiveAlertId }
  );

  const predictiveAlertDetail = useMemo(() => {
    return prediction ?? data?.data;
  }, []);

  const forcastedDate = moment(predictiveAlertDetail?.datePredicted);
  const dayDiff = moment().diff(forcastedDate, 'days');
  const { handleSubmit } = useCustomMutation();
  const [acknowledePrediction, { isLoading: isAcknowledging }] =
    useAcknowledgePredictionsMutation({});
  const [generateWorkOrder, { isLoading: isGenerating }] =
    useGenerateWorkOrderFromPredictionMutation({});

  const handleAcknowledge = async () => {
    const session = await getSession();
    await handleSubmit(
      acknowledePrediction,
      {
        alertId: predictiveAlertDetail?.alertId!,
        acknowlegedBy: session?.user?.username!,
      },
      'Alert Acknowledged Successfully'
    );
    onClose();
  };

  const handleGenerateWorkOrder = async () => {
    await handleSubmit(
      generateWorkOrder,
      {
        alertId: predictiveAlertDetail?.alertId!,
      },
      'Work Order Generated Successfully'
    );
    onClose();
  };

  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="548px">
      <DrawerHeader p={0} m={0}>
        <HStack
          pt="16px"
          pb="40px"
          px={{ base: '24px' }}
          width="full"
          justifyContent="space-between"
        >
          <BackButton handleClick={onClose} />
        </HStack>
      </DrawerHeader>
      <DrawerBody p={0}>
        <VStack width="full" alignItems="flex-start" spacing="56px">
          <VStack
            width="full"
            px={{ base: '24px' }}
            py="16px"
            bgColor="#F500001A"
            alignItems="flex-start"
            spacing="8px"
          >
            <HStack spacing="25px">
              <Text size="xl" lineHeight="100%" fontWeight={400} color="black">
                <Text
                  fontWeight={700}
                  size="xl"
                  lineHeight="100%"
                  as="span"
                  color="#F50000"
                >
                  Anomaly Detected:{' '}
                </Text>
                {prediction?.assetName}
              </Text>
            </HStack>
            <Text fontWeight={700} color="neutral.600" size="md">
              Real-time anomaly detected in sensor readings
            </Text>
          </VStack>
          <VStack
            px={{ base: '24px' }}
            width="full"
            divider={<StackDivider borderColor="#BBBBBB" />}
            spacing="24px"
          >
            <Summary prediction={predictiveAlertDetail} isLoading={isLoading} />
            <AnomalyDetail
              prediction={predictiveAlertDetail}
              isLoading={isLoading}
            />
            <RecommendedAction
              suggestions={predictiveAlertDetail?.suggestions}
              isLoading={isLoading}
            />
          </VStack>
        </VStack>
      </DrawerBody>
      <DrawerFooter p={0} mb="30px">
        <HStack
          width="full"
          px={{ base: '24px' }}
          justifyContent="center"
          spacing="8px"
        >
          <Button
            variant="secondary"
            customStyles={{ width: '75px' }}
            handleClick={handleAcknowledge}
            isLoading={isAcknowledging}
            loadingText="Acknowledging..."
          >
            Dismiss
          </Button>
          <Button
            variant="secondary"
            customStyles={{ width: '161px' }}
            handleClick={handleAcknowledge}
            isLoading={isAcknowledging}
            loadingText="Acknowledging..."
          >
            Acknowledge Anomally
          </Button>
          <Button
            customStyles={{ width: '132px' }}
            handleClick={handleGenerateWorkOrder}
            isLoading={isGenerating}
            loadingText="Creating..."
          >
            Create Ticket
          </Button>
        </HStack>
      </DrawerFooter>
    </GenericDrawer>
  );
};

export default AnomalyDrawer;
