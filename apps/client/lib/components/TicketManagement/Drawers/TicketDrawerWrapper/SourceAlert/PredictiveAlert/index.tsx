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
import AlertSummary from './AlertSummary';
import FailureDrivers from './FailureDrivers';
import SuggestedActions from './SuggestedActions';
import HistoryDataSnapShot from './HistoricalSnapshot';
import { Prediction } from '~/lib/interfaces/prediction.interfaces';
import { useGetAlertPredictionsByAlertIdQuery } from '~/lib/redux/services/prediction.services';
import { dateFormatter } from '~/lib/utils/Formatters';
import moment from 'moment';

interface PredictiveAlertProps {
  isOpen: boolean;
  onClose: () => void;
  predictiveAlertId: number;
  type: 'alert' | 'detail';
  prediction?: Prediction;
}

const PredictiveAlert = (props: PredictiveAlertProps) => {
  const { isOpen, onClose, predictiveAlertId, type, prediction } = props;
  const { data, isLoading } = useGetAlertPredictionsByAlertIdQuery(
    { alertId: predictiveAlertId },
    { skip: prediction !== undefined }
  );

  const predictiveAlertDetail = useMemo(() => {
    return prediction ?? data?.data;
  }, []);

  const forcastedDate = moment(predictiveAlertDetail?.datePredicted);
  const dayDiff = moment().diff(forcastedDate, 'days');

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
            bgColor={type === 'alert' ? '#F500001A' : '#B4BFCA4D'}
            alignItems="flex-start"
          >
            <HStack spacing="25px">
              <Text size="xl" lineHeight="100%" fontWeight={400}>
                <Text fontWeight={700} size="xl" lineHeight="100%" as="span">
                  {type === 'detail'
                    ? 'Predictive Alert: '
                    : 'Imminent Failure Alert'}
                </Text>
                {type === 'detail' && (prediction?.assetName ?? 'N/A')}
              </Text>
              <Text
                color="white"
                bgColor={predictiveAlertDetail?.severityDisplayColorCode}
                py="4px"
                px="12px"
                rounded="full"
              >
                {predictiveAlertDetail?.severityName}
              </Text>
            </HStack>
            {type === 'alert' && (
              <Text
                fontWeight={500}
                color="#F50000"
                size="md"
                lineHeight="100%"
              >
                {predictiveAlertDetail?.assetName} is predicted to fail within{' '}
                {dayDiff} days.
              </Text>
            )}
            {type === 'detail' && (
              <Text fontWeight={700} color="neutral.600">
                Generated on{' '}
                {predictiveAlertDetail?.datePredicted
                  ? dateFormatter(
                      predictiveAlertDetail?.datePredicted,
                      'MMM D, YYYY'
                    )
                  : 'N/A'}
              </Text>
            )}
          </VStack>
          <VStack
            px={{ base: '24px' }}
            width="full"
            divider={<StackDivider borderColor="#BBBBBB" />}
            spacing="24px"
          >
            <AlertSummary
              prediction={predictiveAlertDetail}
              isLoading={isLoading}
            />
            {type === 'detail' && (
              <VStack
                width="full"
                divider={<StackDivider borderColor="#BBBBBB" />}
                spacing="24px"
              >
                <FailureDrivers
                  drivers={predictiveAlertDetail?.drivers}
                  isLoading={isLoading}
                />
                <HistoryDataSnapShot
                  assetId={predictiveAlertDetail?.assetId}
                  isLoading={isLoading}
                />
              </VStack>
            )}
            <SuggestedActions
              suggestions={predictiveAlertDetail?.suggestions}
              isLoading={isLoading}
            />
          </VStack>
        </VStack>
      </DrawerBody>
      {type === 'alert' && (
        <DrawerFooter p={0} mb="30px">
          <HStack
            width="full"
            px={{ base: '24px' }}
            justifyContent="center"
            spacing="16px"
          >
            <Button variant="secondary" customStyles={{ width: '138px' }}>
              Acknowledge
            </Button>
            <Button customStyles={{ width: '237px' }}>
              Generate Work Order
            </Button>
          </HStack>
        </DrawerFooter>
      )}
    </GenericDrawer>
  );
};

export default PredictiveAlert;
